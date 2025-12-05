import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
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

export default function SearchBar({
  placeholder = "Buscar...",
  onChangeText,
  value,
  onApplyFilters,
}) {
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

    if (onApplyFilters) {
      onApplyFilters({
        query: value,
        interests: selectedInterests,
        fields: selectedFields,
        cities: selectedCities,
      });
    }
  };

  const clearFilters = () => {
    setSelectedInterests([]);
    setSelectedFields([]);
    setSelectedCities([]);
    setIsFilterActive(false);
    setModalVisible(false);

    if (onApplyFilters) {
      onApplyFilters({
        query: value,
        interests: [],
        fields: [],
        cities: [],
      });
    }
  };

  return (
    <View className="w-11/12 mx-auto mb-4">
      {/* Input */}
      <View className="flex-row items-center border-2 border-[color:var(--primary-purple)] rounded-lg bg-white pr-2">
        <TextInput
          className="flex-1 px-3 py-2 text-base font-normal"
          placeholder={placeholder}
          placeholderTextColor="#999"
          onChangeText={onChangeText}
          value={value}
        />

        <TouchableOpacity
          onPress={handleFilterPress}
          activeOpacity={0.7}
          className="p-1"
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

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/40 justify-center items-center">
          <View className="w-11/12 max-h-4/5 bg-white rounded-xl p-5">
            <Text className="text-center text-lg font-bold text-[color:var(--primary-purple)] mb-3">
              Filtrar búsqueda
            </Text>

            <ScrollView className="max-h-[70%]">
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
            </ScrollView>

            {/* Botones */}
            <View className="flex-row justify-between mt-5">
              <TouchableOpacity className="flex-1 mr-2" onPress={clearFilters}>
                <LinearGradient
                  colors={["#ccc", "#aaa"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="rounded-lg py-3 items-center"
                >
                  <Text className="text-black font-bold text-base">
                    Borrar filtros
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 ml-2" onPress={applyFilters}>
                <LinearGradient
                  colors={[
                    lightTheme.colors["primary-pink"],
                    lightTheme.colors["primary-purple"],
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="rounded-lg py-3 items-center"
                >
                  <Text className="text-white font-bold text-base">
                    Aplicar filtros
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
