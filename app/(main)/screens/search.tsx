import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../../components/SearchBar";
import UserCard from "../../components/UserCard";
import { lightTheme } from "../../../theme";
import { useUserCard } from "../../../src/hooks/useUserCard";

export default function SearchScreen() {
  const { users, loading, error, getUsersByRelevance } = useUserCard();

  const [searchQuery, setSearchQuery] = useState("");

  // 👇 estados para paginar manualmente
  const [visibleUsers, setVisibleUsers] = useState([]); 
  const [loadCount, setLoadCount] = useState(4); // cuántos mostrar

  // 👉 cuando cambian los usuarios (nueva búsqueda), reiniciar el paginado
  useEffect(() => {
    setVisibleUsers(users.slice(0, 4));
    setLoadCount(4);
  }, [users]);

  const handleSearch = () => {
    getUsersByRelevance(searchQuery);
  };

  // 👉 cargar más cuando se llega abajo
  const handleLoadMore = useCallback(() => {
    if (loadCount >= users.length) return; // no cargar si no quedan más

    const nextCount = loadCount + 4;
    setVisibleUsers(users.slice(0, nextCount));
    setLoadCount(nextCount);
  }, [loadCount, users]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar</Text>
      <Text style={styles.text}>Explora contenido o usuarios</Text>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />

      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <ScrollView
        style={{ width: "105%" }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          const { layoutMeasurement, contentOffset, contentSize } =
            e.nativeEvent;

          // scroll al fondo → cargar más
          const isBottom =
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 50;

          if (isBottom) handleLoadMore();
        }}
        scrollEventThrottle={16}
      >
        {visibleUsers.map((user, index) => (
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
        ))}
      </ScrollView>

      {loading && <Text>Cargando...</Text>}
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
