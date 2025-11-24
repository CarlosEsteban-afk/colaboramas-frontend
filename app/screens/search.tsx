import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import { lightTheme } from "../../theme";
import { useUserCard } from "../../src/hooks/useUserCard";

export default function SearchScreen() {
  // 1. Obtén la función 'getUsersByRelevance' de tu hook
  const { users, loading, error, getUsersByRelevance } = useUserCard();

  // 2. Crea un estado para el texto de la barra de búsqueda
  const [searchQuery, setSearchQuery] = useState("");

  console.log("Users in SearchScreen:", users);

  // 3. Crea una función que se ejecute al enviar la búsqueda
  const handleSearch = () => {
    // Llama a la función del hook con el texto actual
    getUsersByRelevance(searchQuery);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar</Text>
      <Text style={styles.text}>Explora contenido o usuarios</Text>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      <ScrollView
        style={{ width: "105%" }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {users.map((user, index) => (
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
          />))}
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
