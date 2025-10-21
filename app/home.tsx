import React from "react";
import { View, Text, ScrollView } from "react-native";
import BottomBar from "../components/BottomBar";
import UserCard from "../components/UserCard";
import EventCard, { EventItem } from "../components/EventCard";
import { useTranslation } from "react-i18next";

export default function Home() {
  const recommendations = [
    {
      name: "Alicia Mora",
      title: "Psicóloga",
      location: "Temuco, Chile",
      tags: ["Psicología social", "Género"],
    },
    {
      name: "Marcelo Santander",
      title: "Estudiante de Trabajo Social",
      location: "Temuco, Chile",
      tags: ["Psicología social", "Antropología"],
    },
  ];

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

  // Colores por si se requiere fuera de EventCard en el futuro
  const typeColor: Record<string, string> = {
    Congreso: "#6B31E8",
    Concurso: "#E91E63",
    Charla: "#EE6C21",
    Conferencia: "#82A50B",
  };

  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 80,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>{t("home.recommendations")}</Text>

        {recommendations.map((rec, index) => (
          <UserCard title={""} key={index} {...rec} />
        ))}

        <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 24, marginBottom: 8 }}>{t("home.events")}</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingVertical: 4 }}>
          {events.map((ev) => (
            <EventCard key={ev.id} event={ev} onPress={() => {}} />
          ))}
        </ScrollView>
      </ScrollView>

      <BottomBar />
    </View>
  );
}