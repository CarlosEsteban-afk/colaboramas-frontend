import { View, Text, ScrollView } from "react-native";
import BottomBar from "../components/BottomBar";
import UserCard from "../components/UserCard";

export default function Home() {
  const recommendations = [
    {
      name: "Alicia Mora",
      role: "Psicóloga",
      location: "Temuco, Chile",
      tags: ["Psicología social", "Género"],
    },
    {
      name: "Marcelo Santander",
      role: "Estudiante de Trabajo Social",
      location: "Temuco, Chile",
      tags: ["Psicología social", "Antropología"],
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 80, // espacio para la BottomBar
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
          Recomendaciones
        </Text>

        {recommendations.map((rec, index) => (
          <UserCard key={index} {...rec} />
        ))}

        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginTop: 24,
            marginBottom: 8,
          }}
        >
          Eventos
        </Text>

      </ScrollView>

      <BottomBar />
    </View>
  );
}
