import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import { lightTheme } from "../../theme";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import api from "../../client";

export default function AdminDashboard() {
  const router = useRouter();
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [byRole, setByRole] = useState<{ [k: string]: number }>({});
  const [byCountry, setByCountry] = useState<{ [k: string]: number }>({});
  const [totalEvents, setTotalEvents] = useState<number | null>(null);
  const [byEventType, setByEventType] = useState<{ [k: string]: number }>({});

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all dashboard stats
      const [usersNumberRes, eventsNumberRes, usersPerRolRes, eventsPerTypeRes, userPerCountryRes] = await Promise.all([
        api.get("/admin/usersNumber"),
        api.get("/admin/eventsNumber"),
        api.get("/admin/usersPerRol"),
        api.get("/admin/eventsPerType"),
        api.get("/admin/userPerCountry"),
      ]);

      // Backend historically returned different keys. Accept either { total } or { usersNumber } / { eventsNumber }
      const usersTotal = (usersNumberRes.data && (usersNumberRes.data.total ?? usersNumberRes.data.usersNumber)) ?? 0;
      const eventsTotal = (eventsNumberRes.data && (eventsNumberRes.data.total ?? eventsNumberRes.data.eventsNumber)) ?? 0;
      setTotalUsers(usersTotal);
      setTotalEvents(eventsTotal);
      
      // Map role data - backend returns lowercase keys, normalize to uppercase
      const roleData = usersPerRolRes.data || {};
      const normalizedRoles: { [k: string]: number } = {};
      if (roleData.comunicadores !== undefined) normalizedRoles.COMUNICADOR = roleData.comunicadores;
      if (roleData.investigadores !== undefined) normalizedRoles.ACADEMICO = roleData.investigadores;
      setByRole(normalizedRoles);

      // Map event type data - normalize to title case
      const eventTypeData = eventsPerTypeRes.data || {};
      const normalizedEvents: { [k: string]: number } = {};
      if (eventTypeData.conferencias !== undefined) normalizedEvents.Conferencia = eventTypeData.conferencias;
      if (eventTypeData.charlas !== undefined) normalizedEvents.Charla = eventTypeData.charlas;
      if (eventTypeData.concursos !== undefined) normalizedEvents.Concurso = eventTypeData.concursos;
      if (eventTypeData.congresos !== undefined) normalizedEvents.Congreso = eventTypeData.congresos;
      setByEventType(normalizedEvents);

      // Normalize country names to title case
      const countryData = userPerCountryRes.data || {};
      const normalizedCountries: { [k: string]: number } = {};
      for (const [country, count] of Object.entries(countryData)) {
        const titleCaseCountry = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();
        normalizedCountries[titleCaseCountry] = count as number;
      }
      setByCountry(normalizedCountries);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // Fallback to mock data if API fails
      setTotalUsers(1240);
      setByRole({ ACADEMICO: 870, COMUNICADOR: 370 });
      setByCountry({
        Perú: 1,
        Brasil: 2,
        España: 2,
        Panamá: 1,
        México: 1,
        Argentina: 4,
        Bolivia: 1,
        Canadá: 1,
        Paraguay: 1,
        Uruguay: 1,
        Chile: 3,
        Colombia: 1,
        Ecuador: 1,
      });
      setTotalEvents(27);
      setByEventType({ Conferencia: 6, Congreso: 8, Charla: 7, Concurso: 6 });
    }
  };

  const roles = ["ACADEMICO", "COMUNICADOR"];
  const maxRole = Math.max(...Object.values(byRole), 1);
  const screenWidth = Dimensions.get("window").width - 48;
  const pieData = roles.map((r, i) => {
    const value = byRole[r] ?? 0;
    const color = i === 0 ? lightTheme.colors["primary-pink"] : lightTheme.colors["primary-purple"];
    return {
      name: r === "ACADEMICO" ? "Investigador" : "Comunicador",
      population: value,
      color,
      legendFontColor: "#333",
      legendFontSize: 12,
    };
  });

  const eventTypes = ["Conferencia", "Congreso", "Charla", "Concurso"];
  const eventColors = [lightTheme.colors["primary-purple"], lightTheme.colors["primary-pink"], "#4CAF50", "#FFC107"];
  const pieDataEvents = eventTypes.map((t, i) => {
    const value = byEventType[t] ?? 0;
    return {
      name: t,
      population: value,
      color: eventColors[i] || "#ccc",
      legendFontColor: "#333",
      legendFontSize: 12,
    };
  });

  return (
  <ScrollView style={Platform.OS === 'web' ? undefined : { flex: 1 }} contentContainerStyle={styles.container} nestedScrollEnabled={true} showsVerticalScrollIndicator={true} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Usuarios registrados</Text>
        <Text style={styles.bigNumber}>{totalUsers ?? "—"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Eventos registrados</Text>
        <Text style={styles.bigNumber}>{totalEvents ?? "—"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Usuarios por rol</Text>
        <PieChart
          data={pieData}
          width={screenWidth}
          height={200}
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Eventos por tipo</Text>
        <PieChart
          data={pieDataEvents}
          width={screenWidth}
          height={200}
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Usuarios por país (top 8)</Text>
        {Object.entries(byCountry)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8)
          .map(([country, count]) => (
            <View key={country} style={styles.row}>
              <Text style={{ flex: 1 }}>{getFlagEmoji(country)} {country}</Text>
              <Text style={{ fontWeight: "700" }}>{count}</Text>
            </View>
          ))}
      </View>

      {/* Metric block removed per request */}
    </ScrollView>
  );
}

// Small helper to convert country name to flag emoji.
function getFlagEmoji(countryName: string) {
  // Normalize input (remove accents, lowercase) and map common country names
  if (!countryName) return "";
  const key = countryName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  const map: Record<string, string> = {
    peru: "PE",
    brasil: "BR",
    espana: "ES",
    panama: "PA",
    mexico: "MX",
    argentina: "AR",
    bolivia: "BO",
    canada: "CA",
    paraguay: "PY",
    uruguay: "UY",
    chile: "CL",
    colombia: "CO",
    ecuador: "EC",
  };

  const code = map[key] ?? null;
  if (!code) return "";
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 140, flexGrow: 1, backgroundColor: "#F6F6F6" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12, color: lightTheme.colors["primary-purple"] },
  card: { backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 12 },
  cardTitle: { fontSize: 14, fontWeight: "700", color: "#333" },
  bigNumber: { fontSize: 32, fontWeight: "800", color: lightTheme.colors["primary-purple"], marginTop: 8 },
  chartRow: { flexDirection: "row", alignItems: "flex-end", gap: 12, marginTop: 12 },
  barWrap: { alignItems: "center", width: 80 },
  bar: { width: 36, backgroundColor: lightTheme.colors["primary-pink"], borderRadius: 6 },
  barLabel: { marginTop: 8, fontSize: 12 },
  barValue: { fontWeight: "700" },
  row: { flexDirection: "row", paddingVertical: 8, alignItems: "center" },
});
