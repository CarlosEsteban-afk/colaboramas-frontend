import React from "react";
import { View, Text, ScrollView } from "react-native";
import UserCard from "../../components/UserCard";
import { useTranslation } from "react-i18next";
import { useUserCard } from "../../../../src/hooks/useUserCard";
export default function HomeScreen() {
  const { t } = useTranslation();
  const { users, loading, error } = useUserCard();

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 80,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            fontFamily: "Lato_400Regular",
            marginBottom: 8,
          }}
        >
          {t("home.recommendations")}
        </Text>

        {loading ? (
          <Text>Cargando usuarios...</Text>
        ) : error ? (
          <Text style={{ color: "red" }}>Error: {error}</Text>
        ) : (
          users
            .slice(0, 2)
            .map((user, index) => (
              <UserCard
                key={user.id || index}
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
              />
            ))
        )}
      </ScrollView>
    </View>
  );
}
