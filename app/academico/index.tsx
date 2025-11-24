import React from "react";
import EventCard, { EventItem } from "../components/EventCard";
import { View, Text, ScrollView } from "react-native";
import UserCard from "../components/UserCard";
import { useTranslation } from "react-i18next";
import { useUserCard } from "../../src/hooks/useUserCard";
export default function HomeScreen() {
  const { t } = useTranslation();
  const { users, loading, error } = useUserCard();


  const events: EventItem[] = [
    {
      id: "ev-1",
      title: "2do Congreso Internacional de Ciencias de la Rehabilitación",
      date: "23 y 24 de Octubre, 2025",
      place: "Santiago, Chile",
      type: "Congreso",
    },
    {
      id: "ev-2",
      title: "Concurso ANID FAPESQ 2025",
      date: "10 Septiembre, 2025",
      place: "Chile",
      type: "Concurso",
    },
    {
      id: "ev-3",
      title: "Charlas de Innovación en Salud",
      date: "15 Noviembre, 2025",
      place: "Temuco, Chile",
      type: "Charla",
    },
    {
      id: "ev-4",
      title: "Conferencia ANDI-FAU",
      date: "30 Noviembre, 2025",
      place: "Valdivia, Chile",
      type: "Conferencia",
    },
  ];


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
          users.slice(0,2).map((user, index) => (
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

        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginTop: 24,
            marginBottom: 8,
          }}
        >
          {t("home.events")}
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingVertical: 4 }}
        >
          {events.map((ev) => (
            <EventCard key={ev.id} event={ev} onPress={() => {}} horizontal />
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}
