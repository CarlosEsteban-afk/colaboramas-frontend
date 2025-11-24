import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { lightTheme } from "../../theme";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function AdminDashboard() {
  const router = useRouter();
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [byRole, setByRole] = useState<{ [k: string]: number }>({});
  const [byCountry, setByCountry] = useState<{ [k: string]: number }>({});

  useEffect(() => {
    // For dev show mock data so charts render without backend
    setTotalUsers(1240);
    setByRole({ ACADEMICO: 870, COMUNICADOR: 370 });
    setByCountry({ Chile: 410, Argentina: 300, Perú: 180, México: 150, Colombia: 110 });
  }, []);

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Usuarios registrados</Text>
        <Text style={styles.bigNumber}>{totalUsers ?? "—"}</Text>
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

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Métrica adicional</Text>
        <Text>Usuarios activos últimos 30 días: (placeholder)</Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.btn} onPress={() => router.push("/admin/users")}> 
          <Text style={styles.btnText}>Gestionar Usuarios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => router.push("/admin/events")}> 
          <Text style={styles.btnText}>Gestionar Eventos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Small helper to convert country name to flag emoji.
function getFlagEmoji(countryName: string) {
  // Map a few common Spanish country names to ISO country codes
  const map: Record<string, string> = {
    Chile: "CL",
    Argentina: "AR",
    Perú: "PE",
    Mexico: "MX",
    México: "MX",
    Colombia: "CO",
    Brasil: "BR",
  };
  const code = map[countryName] ?? null;
  if (!code) return "";
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40, backgroundColor: "#F6F6F6" },
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
  actionsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  btn: { flex: 1, padding: 12, backgroundColor: lightTheme.colors["primary-purple"], borderRadius: 8, marginRight: 8, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "700" },
});
