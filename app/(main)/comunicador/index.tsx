// HomeLimitedScreen.tsx
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import UserCard from "../../components/UserCard";
import { useTranslation } from "react-i18next";
import { useUserCard } from "../../../src/hooks/useUserCard";

export default function HomeLimitedScreen() {
  const { t } = useTranslation();
  const { users: fetchedUsers, loading, error, getUsersByRelevance } = useUserCard();

  const [users, setUsers] = useState(fetchedUsers);
  const [loadCount, setLoadCount] = useState(4);

  useEffect(() => {
    setUsers(fetchedUsers);
    setLoadCount(4);
  }, [fetchedUsers]);

  const handleContactSent = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleLoadMore = useCallback(() => {
    if (loadCount >= users.length) return;
    const nextCount = loadCount + 4;
    setUsers(users.slice(0, nextCount));
    setLoadCount(nextCount);
  }, [loadCount, users]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
          {t("home.recommendations")}
        </Text>

        {loading ? (
          <Text>Cargando usuarios...</Text>
        ) : error ? (
          <Text style={{ color: "red" }}>Error: {error}</Text>
        ) : (
          users.slice(0, loadCount).map((user, index) => (
            <UserCard
              key={user.id || index}
              id={user.id}
              title={user.profesion}
              name={user.nombre}
              imageUrl={user.imageUrl}
              location={user.ciudad ? `${user.ciudad}, ${user.pais}` : ""}
              tags={
                Array.isArray(user.camposInvestigacion)
                  ? user.camposInvestigacion
                  : Array.isArray(user.lineasInteres)
                  ? user.lineasInteres
                  : []
              }
              onContactSent={handleContactSent} 
            />
          ))
        )}

        {users.length > loadCount && (
          <Text
            style={{
              color: "#007AFF",
              fontWeight: "600",
              textAlign: "center",
              marginTop: 12,
            }}
            onPress={handleLoadMore}
          >
            Cargar más
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
