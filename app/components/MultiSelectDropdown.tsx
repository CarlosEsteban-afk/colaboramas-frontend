// components/MultiSelectDropdown.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import { Monicon } from "@monicon/native";
import { lightTheme } from "../../theme";
import { useTranslation } from "react-i18next";

export default function MultiSelectDropdown({
  label,
  options,
  selected,
  setSelected,
  searchable = true,
}: any) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  // 🔥 opciones deben ser SIEMPRE un array plano
  const normalizedOptions = Array.isArray(options) ? options : [];

  const filteredOptions = normalizedOptions.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (value: string) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity style={styles.input} onPress={() => setOpen(true)}>
        <Text style={styles.inputText}>
          {selected.length > 0 ? selected.join(", ") : t("multiSelect.placeholder")}
        </Text>

        <Monicon
          name="mdi:chevron-down"
          size={22}
          color={lightTheme.colors["primary-purple"]}
        />
      </TouchableOpacity>

      <Modal visible={open} animationType="slide" transparent onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)} />

        <View style={styles.bottomDrawer}>
          <View style={styles.drawerHandle} />

          <View style={styles.header}>
            <Text style={styles.drawerTitle}>{label}</Text>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Monicon name="mdi:close" size={24} color={lightTheme.colors["primary-purple"]} />
            </TouchableOpacity>
          </View>

          {searchable && (
            <TextInput
              placeholder={t("multiSelect.searchPlaceholder")}
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
          )}

          <FlatList
            data={filteredOptions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const isSelected = selected.includes(item);

              return (
                <TouchableOpacity
                  onPress={() => toggleSelect(item)}
                  style={styles.option}
                  activeOpacity={0.6}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && {
                        color: lightTheme.colors["primary-purple"],
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    {item}
                  </Text>

                  {isSelected && (
                    <Monicon
                      name="mdi:check"
                      size={20}
                      color={lightTheme.colors["primary-purple"]}
                    />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: "Lato_700Bold",
    color: lightTheme.colors["dark-gray"],
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.5,
    borderColor: lightTheme.colors["primary-purple"],
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputText: { fontSize: 16, fontFamily: "Lato_400Regular", color: "#444", flex: 1, marginRight: 8 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  bottomDrawer: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 12,
    paddingHorizontal: 16,
    maxHeight: "70%",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  drawerHandle: { width: 40, height: 5, backgroundColor: "#CCC", borderRadius: 3, alignSelf: "center", marginBottom: 10 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  drawerTitle: { fontSize: 18, fontFamily: "Lato_700Bold" },
  searchInput: { borderWidth: 1, borderColor: "#EEE", borderRadius: 8, padding: 8, marginBottom: 10 },
  option: { paddingVertical: 10, borderBottomWidth: 0.5, borderColor: "#EEE", flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  optionText: { fontSize: 15, fontFamily: "Lato_400Regular" },
});
