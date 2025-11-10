import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import { lightTheme } from "../../theme";

export default function SearchScreen() {
  const users = [
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
    {
      name: "Sofía Reyes",
      title: "Investigadora en Neurociencia",
      location: "Santiago, Chile",
      tags: ["Neuroplasticidad", "Cognición"],
    },
    {
      name: "Tomás Rivas",
      title: "Sociólogo",
      location: "Valdivia, Chile",
      tags: ["Cultura", "Educación", "Desigualdad"],
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar</Text>
      <Text style={styles.text}>Explora contenido o usuarios</Text>

      <SearchBar />

      <ScrollView
        style={{ width: "105%" }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {users.map((user, index) => (
          <UserCard key={index} {...user} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: lightTheme.colors["primary-purple"],
  },
  text: {
    color: lightTheme.colors["dark-gray"],
    marginBottom: 20,
  },
});
