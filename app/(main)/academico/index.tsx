// HomeScreen.tsx
import React, { useEffect, useState } from "react";
import EventCardRight, { EventItem } from "../../components/EventCardRight";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import UserCard from "../../components/UserCard";
import { useTranslation } from "react-i18next";
import { useUserCard } from "../../../src/hooks/useUserCard";
import { lightTheme } from "../../../theme";
import api from "../../../client";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { users: fetchedUsers, loading, error } = useUserCard();

  const [users, setUsers] = useState(fetchedUsers);

  const handleContactSent = (userId: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

    useEffect(() => {
    setUsers(fetchedUsers);
  }, [fetchedUsers]);

  const [events, setEvents] = useState<EventItem[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const resp = await api.get("/events");
        const data = resp.data;
        if (!Array.isArray(data)) throw new Error("Invalid events response");

        const mapType = (t: string) => {
          if (!t) return t;
          const map: Record<string, string> = {
            CHARLA: "Charla",
            CONGRESO: "Congreso",
            CONCURSO: "Concurso",
            CONFERENCIA: "Conferencia",
          };
          return map[t.toUpperCase()] ?? (t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
        };

        const mapped: EventItem[] = data.map((e: any) => ({
          id: String(e.id),
          title: e.title ?? "",
          date: e.date ?? "",
          place: e.ubication ?? e.ubication ?? e.place ?? "",
          type: mapType(e.type ?? e.tipo ?? ""),
          description: e.description ?? "",
          image: e.imageUrl ?? e.image_url ?? e.image ?? undefined,
        }));

        setEvents(mapped);
      } catch (err: any) {
        console.error("Error fetching events for home:", err);
        setEventsError(err?.message ? String(err.message) : "Error cargando eventos");
      } finally {
        setEventsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const router = useRouter();

  return (
    <View style={{ backgroundColor: "#FFF" }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
          {t("home.recommendations")}
        </Text>

        {loading ? (
          <Text>Cargando usuarios...</Text>
        ) : error ? (
          <Text style={{ color: "red" }}>Error: {error}</Text>
        ) : (
          users.slice(0, 2).map((user) => (
            <UserCard
              key={user.id}
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

        <Text style={{ fontSize: 22, fontWeight: "bold", marginVertical: 10, marginBottom: 8 }}>
          {t("home.events")}
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingVertical: 4 }}
        >
          {eventsLoading ? (
            <View style={{ paddingVertical: 20 }}>
              <ActivityIndicator size="small" color={lightTheme.colors["primary-purple"]} />
            </View>
          ) : eventsError ? (
            <Text style={{ color: "red" }}>{eventsError}</Text>
          ) : (
            events.map((ev) => (
              <View key={ev.id} style={{ marginRight: 12, minWidth: 320 }}>
                <EventCardRight event={ev} onPress={() => router.push(`/academico/event/${ev.id}`)} />
              </View>
            ))
          )}
        </ScrollView>
      </ScrollView>
    </View>
  );
}
