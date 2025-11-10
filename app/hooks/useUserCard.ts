import { useEffect, useState } from "react";
import api from "../../client";
import { UserCardDTO } from "../../src/models/userCard.dto";
import { userAdapter } from "../adapters/user.adapter";

export const useUserCard = () => {
  const [users, setUsers] = useState<UserCardDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get<UserCardDTO[]>("/users/card");
      const mapped = response.data.map(userAdapter.fromCardDto);
      console.log("Fetched users:", mapped);  
      setUsers(mapped);
    } catch (err: any) {
      setError(err.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { users, loading, error, refresh: getUsers };
};
