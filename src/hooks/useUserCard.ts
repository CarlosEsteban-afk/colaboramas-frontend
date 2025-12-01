// src/hooks/useUserCard.ts
import { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../client";
import { UserCardDTO } from "../models/userCard.dto";
import { userAdapter } from "../adapters/user.adapter";

export const useUserCard = () => {
  const [users, setUsers] = useState<UserCardDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cache = useRef<UserCardDTO[] | null>(null);

  const getUsers = async () => {
    try {
      setLoading(true);

      if (cache.current) {
        setUsers(cache.current);
        setLoading(false);
        return;
      }

      const cachedStorage = await AsyncStorage.getItem("cached_users");
      if (cachedStorage) {
        const parsed = JSON.parse(cachedStorage) as UserCardDTO[];
        cache.current = parsed;
        setUsers(parsed);
      }

      const response = await api.get<UserCardDTO[]>("/search/recommendations");
      const mapped = response.data.map(userAdapter.fromCardDto);

      setUsers(mapped);
      cache.current = mapped;
      await AsyncStorage.setItem("cached_users", JSON.stringify(mapped));

    } catch (err: any) {
      setError(err.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const getUsersByRelevance = async (query: string) => {
    if (!query) return getUsers();

    try {
      setLoading(true);
      const response = await api.get<UserCardDTO[]>(`/search/relevance?query=${query}`);
      const mapped = response.data.map(userAdapter.fromCardDto);

      setUsers(mapped);
      cache.current = mapped; 
      await AsyncStorage.setItem("cached_users", JSON.stringify(mapped));

    } catch (err: any) {
      setError(err.message || "Error fetching users by relevance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { users, loading, error, refresh: getUsers, getUsersByRelevance };
};
