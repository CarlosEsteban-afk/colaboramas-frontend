import React from "react";
import { View, TextInput } from "react-native";
import { lightTheme } from "../../theme";

export default function SearchBar({ placeholder = "Buscar...", onChangeText, value, onApplyFilters }: any) {
  return (
    <View className="w-11/12 mx-auto mb-4">
      <View className="flex-row items-center border-2 rounded-lg bg-white pr-2" style={{borderColor: lightTheme.colors["primary-purple"],}}>
        <TextInput
          className="flex-1 px-3 py-2 text-base font-normal"
          placeholder={placeholder}
          placeholderTextColor="#999"
          onChangeText={onChangeText}
          value={value}
        />
      </View>
    </View>
  );
}
