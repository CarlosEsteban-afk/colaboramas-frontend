import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import SearchBar from "../../components/SearchBar";
import UserCard from "../../components/UserCard";
import { lightTheme } from "../../../theme";
import { useUserCard } from "../../../src/hooks/useUserCard";

export default function SearchScreen() {
  const { users, loading, error, getUsersByRelevance } = useUserCard();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [loadCount, setLoadCount] = useState(4);

useEffect(() => {
  // filtrado dinámico mientras escribís
  const filtered = users.filter((u) => {
    const matchText =
      u.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.profesion &&
        u.profesion.toLowerCase().includes(searchQuery.toLowerCase()));

    // Si querés, podés combinar con filtros activos también
    return matchText;
  });

  setVisibleUsers(filtered.slice(0, 4));
  setLoadCount(4);
}, [searchQuery, users]);


  const handleSearch = () => {
    getUsersByRelevance(searchQuery);
  };

  const handleLoadMore = useCallback(() => {
    if (loadCount >= users.length) return;
    const nextCount = loadCount + 4;
    setVisibleUsers(users.slice(0, nextCount));
    setLoadCount(nextCount);
  }, [loadCount, users]);

  const handleContactSent = (id: number) => {
    // animación de removal: filtramos el usuario contactado
    setVisibleUsers((prev) => prev.filter((u: any) => u.id !== id));
  };

  return (
    <View className="flex-1 bg-white pt-5 items-center">
      <Text className="text-2xl font-semibold text-[color:var(--primary-purple)]">
        Buscar
      </Text>
      <Text className="text-gray-500 mb-5">Explora contenido o usuarios</Text>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onApplyFilters={({ query, interests, fields, cities }) => {
          const filtered = users.filter((u) => {
            const matchText =
              u.nombre.toLowerCase().includes(query.toLowerCase()) ||
              (u.profesion &&
                u.profesion.toLowerCase().includes(query.toLowerCase()));

            const matchInterests =
              interests.length === 0 ||
              (u.lineasInteres || []).some((i) => interests.includes(i));

            const matchFields =
              fields.length === 0 ||
              (u.camposInvestigacion || []).some((f) => fields.includes(f));

            const matchCities =
              cities.length === 0 || (u.ciudad && cities.includes(u.ciudad));

            return matchText && matchInterests && matchFields && matchCities;
          });

          setVisibleUsers(filtered.slice(0, 4));
          setLoadCount(4);
        }}
      />

      {error && <Text className="text-red-500">{error}</Text>}

      <ScrollView
        className="w-full px-4"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          const { layoutMeasurement, contentOffset, contentSize } =
            e.nativeEvent;
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
            id={user.id}
            name={user.nombre}
            title={user.profesion}
            location={user.ciudad ? `${user.ciudad}, ${user.pais}` : ""}
            imageUrl={user.imageUrl}
            tags={
              Array.isArray(user.camposInvestigacion)
                ? user.camposInvestigacion
                : Array.isArray(user.lineasInteres)
                ? user.lineasInteres
                : []
            }
            onContactSent={handleContactSent}
          />
        ))}
      </ScrollView>

      {loading && <Text>Cargando...</Text>}
    </View>
  );
}
