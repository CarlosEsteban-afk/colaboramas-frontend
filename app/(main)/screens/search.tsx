import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Monicon } from "@monicon/native";
import SearchBar from "../../components/SearchBar";
import UserCard from "../../components/UserCard";
import MultiSelectDropdown from "../../components/MultiSelectDropdown";
import { lightTheme } from "../../../theme";
import { useUserCard } from "../../../src/hooks/useUserCard";
import { useTranslation } from "react-i18next";

// ---- DATA ----
import interestsRaw from "../../../src/data/interest.json";
import fieldsRaw from "../../../src/data/research_fields.json";
import countriesRaw from "../../../src/data/countries.json";

export default function SearchScreen() {
  const { t } = useTranslation();
  const { users, loading, error, getUsersByRelevance } = useUserCard();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [visibleUsers, setVisibleUsers] = useState<any[]>([]);
  const [loadCount, setLoadCount] = useState(4);

  const interestsList = interestsRaw.interests ?? [];
  const fieldsList = fieldsRaw.research_fields ?? [];

  const countryCityList = Object.entries(countriesRaw).flatMap(
    ([country, cities]: [string, string[]]) =>
      cities.map((city) => `${city}, ${country}`)
  );

  // ---- FILTRADO ----
  useEffect(() => {
    const filtered = users.filter((u) => {
      const matchesText =
        u.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.profesion &&
          u.profesion.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesInterests =
        selectedInterests.length === 0 ||
        (u.lineasInteres &&
          u.lineasInteres.some((i: string) => selectedInterests.includes(i)));

      const matchesFields =
        selectedFields.length === 0 ||
        (u.camposInvestigacion &&
          u.camposInvestigacion.some((f: string) =>
            selectedFields.includes(f)
          ));

      const matchesCities =
        selectedCities.length === 0 ||
        (u.ciudad &&
          selectedCities.includes(`${u.ciudad}, ${u.pais}`));

      return matchesText && matchesInterests && matchesFields && matchesCities;
    });

    setVisibleUsers(filtered.slice(0, 4));
    setLoadCount(4);
  }, [searchQuery, users, selectedInterests, selectedFields, selectedCities]);

  const handleLoadMore = useCallback(() => {
    if (loadCount >= users.length) return;

    const nextCount = loadCount + 4;
    setVisibleUsers(users.slice(0, nextCount));
    setLoadCount(nextCount);
  }, [loadCount, users]);

  const handleContactSent = (id: number) => {
    setVisibleUsers((prev) => prev.filter((u: any) => u.id !== id));
  };

  const resetFilters = () => {
    setSelectedInterests([]);
    setSelectedFields([]);
    setSelectedCities([]);
  };

  return (
    <View className="flex-1 bg-white pt-5 items-center">

      {/* --------- HEADER --------- */}
      <Text
        className="text-2xl font-semibold"
        style={{ color: lightTheme.colors["primary-purple"] }}
      >
        {t("search.title")}
      </Text>

      <Text className="text-gray-500 mb-5">{t("search.subtitle")}</Text>

      {/* ------- SEARCH + BUTTON FILTERS -------- */}
      <View className="w-full flex-row justify-center items-center px-4 pb-2">
        <View className="flex-1">
          <SearchBar
            value={searchQuery}
            placeholder={t("search.searchPlaceholder")}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setDrawerOpen(true)}
        >
          <Monicon
            name="mdi:filter-variant"
            size={32}
            color={lightTheme.colors["primary-purple"]}
          />
        </TouchableOpacity>
      </View>

      {/* ------- LISTA -------- */}
      <ScrollView
        className="w-full px-4"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
          const isBottom =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
          if (isBottom) handleLoadMore();
        }}
        scrollEventThrottle={16}
      >
        {visibleUsers.map((user) => (
          <UserCard
            key={user.id}
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

      {loading && <Text>{t("search.loading")}</Text>}
      {error && <Text className="text-red-500">{t("search.error")}</Text>}

      {/* --------- BOTTOM DRAWER FILTERS --------- */}
      <Modal
        visible={drawerOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setDrawerOpen(false)}
      >
        <View style={styles.overlay} />

        <View style={styles.drawer}>
          <View style={styles.drawerHandle} />

          <View style={styles.drawerHeader}>
            <Text style={styles.drawerTitle}>{t("search.filtersTitle")}</Text>
            <TouchableOpacity onPress={() => setDrawerOpen(false)}>
              <Monicon
                name="mdi:close"
                size={26}
                color={lightTheme.colors["primary-purple"]}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ maxHeight: "80%" }}>
            <MultiSelectDropdown
              label={t("search.filters.interests")}
              options={interestsList}
              selected={selectedInterests}
              setSelected={setSelectedInterests}
            />

            <MultiSelectDropdown
              label={t("search.filters.fields")}
              options={fieldsList}
              selected={selectedFields}
              setSelected={setSelectedFields}
            />

            <MultiSelectDropdown
              label={t("search.filters.city")}
              options={countryCityList}
              selected={selectedCities}
              setSelected={setSelectedCities}
            />

            {/* LIMPIAR FILTROS */}
            <TouchableOpacity style={styles.clearButton} onPress={resetFilters}>
              <Text style={styles.clearText}>{t("search.clearFilters")}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    borderColor: lightTheme.colors["primary-purple"],
    paddingRight: 8
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  drawer: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 16,
    paddingBottom: 40,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  drawerHandle: {
    width: 45,
    height: 5,
    backgroundColor: "#CCC",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 12,
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: lightTheme.colors["dark-gray"],
  },
  clearButton: {
    marginTop: 20,
    paddingVertical: 10,
    alignSelf: "center",
  },
  clearText: {
    color: lightTheme.colors["primary-purple"],
    fontSize: 16,
    fontWeight: "600",
  },
});
