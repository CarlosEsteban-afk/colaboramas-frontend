import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  ScrollView,
} from "react-native";
import { Monicon } from "@monicon/native";
import { lightTheme } from "../../theme";
import { LinearGradient } from "expo-linear-gradient";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { researchFields } from "../../src/constants/researchFields";
import { cities } from "../../src/constants/cities";

export default function SearchBar({ placeholder = "Buscar...", onChangeText, value }) {
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const handleFilterPress = () => setModalVisible(true);

  const applyFilters = () => {
    const hasFilters =
      selectedInterests.length > 0 ||
      selectedFields.length > 0 ||
      selectedCities.length > 0;

    setIsFilterActive(hasFilters);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999"
          onChangeText={onChangeText}
          value={value}
        />

        {/* Botón de filtro */}
        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleFilterPress}
          activeOpacity={0.7}
        >
          <Monicon
            name={
              isFilterActive
                ? "material-symbols:filter-alt"
                : "material-symbols:filter-alt-outline"
            }
            size={26}
            color={lightTheme.colors["primary-purple"]}
          />
        </TouchableOpacity>
      </View>

      {/* Modal de filtros */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filtrar búsqueda</Text>

            <View
             style={{ maxHeight: "70%" }}
            >
              <MultiSelectDropdown
                label="Intereses"
                options={researchFields}
                selected={selectedInterests}
                setSelected={setSelectedInterests}
              />

              <MultiSelectDropdown
                label="Campos de investigación"
                options={researchFields}
                selected={selectedFields}
                setSelected={setSelectedFields}
              />

              <MultiSelectDropdown
                label="Ciudad"
                options={cities}
                selected={selectedCities}
                setSelected={setSelectedCities}
              />
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={applyFilters}>
              <LinearGradient
                colors={[
                  lightTheme.colors["primary-pink"],
                  lightTheme.colors["primary-purple"],
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientButton}
              >
                <Text style={styles.closeText}>Aplicar filtros</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: lightTheme.colors["primary-purple"],
    borderRadius: 6,
    backgroundColor: "#FFF",
    paddingRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: "Lato_400Regular",
  },
  filterButton: {
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Lato_700Bold",
    color: lightTheme.colors["primary-purple"],
    marginBottom: 12,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
  },
  gradientButton: {
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  closeText: {
    color: "#FFF",
    fontFamily: "Lato_700Bold",
    fontSize: 16,
  },
});
