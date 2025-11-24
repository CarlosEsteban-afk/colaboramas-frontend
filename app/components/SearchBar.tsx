import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { lightTheme } from "../../theme";

interface Props {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
}

export default function SearchBar({ placeholder = "Buscar...", onChangeText, value }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: lightTheme.colors["primary-purple"],
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
});
