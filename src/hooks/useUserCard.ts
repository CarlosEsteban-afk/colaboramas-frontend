import { useEffect, useState } from "react";
import api from "../../client";
import { UserCardDTO } from "../models/userCard.dto";
import { userAdapter } from "../adapters/user.adapter";

export const useUserCard = () => {
  const [users, setUsers] = useState<UserCardDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get<UserCardDTO[]>("/search/recommendations");
      console.log("Fetched users:", response.data);
      const mapped = response.data.map(userAdapter.fromCardDto);
      setUsers(mapped);
    } catch (err: any) {
      setError(err.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };
   const getUsersByRelevance = async (query: string) => {
    if (!query) {
      return getUsers(); // Fetch recommendations if query is empty
    }
    try {
      setLoading(true);
      // Assuming the endpoint is /search/relevance and takes a query parameter
      const response = await api.get<UserCardDTO[]>(`/search/relevance?query=${query}`);
      console.log("Fetched users by relevance:", response.data);
      const mapped = response.data.map(userAdapter.fromCardDto);
      setUsers(mapped);
    } catch (err: any) {
      setError(err.message || "Error fetching users by relevance");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getUsers();
  }, []);

  return { users, loading, error, refresh: getUsers, getUsersByRelevance};
};
