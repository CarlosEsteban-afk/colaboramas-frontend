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
import { useTranslation } from "react-i18next"; // ← Import

type Option = string | { country: string; city: string };

interface Props {
  label: string;
  options: Option[];
  selected: string[];
  setSelected: (values: string[]) => void;
  searchable?: boolean;
}

export default function MultiSelectDropdown({
  label,
  options,
  selected,
  setSelected,
  searchable = true,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { t } = useTranslation(); // ← Inicializamos traducción

  const filteredOptions = options.filter((item) => {
    const value =
      typeof item === "string" ? item : `${item.city}, ${item.country}`;
    return value.toLowerCase().includes(search.toLowerCase());
  });

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

      {/* Input principal */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setOpen(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.inputText}>
          {selected.length > 0
            ? selected.join(", ")
            : t("multiSelect.placeholder")} {/* ← Traducción */}
        </Text>
        <Monicon
          name="mdi:chevron-down"
          size={22}
          color={lightTheme.colors["primary-purple"]}
        />
      </TouchableOpacity>

      {/* Bottom Drawer */}
      <Modal
        visible={open}
        animationType="slide"
        transparent
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setOpen(false)} />

        <View style={styles.bottomDrawer}>
          <View style={styles.drawerHandle} />

          <View style={styles.header}>
            <Text style={styles.drawerTitle}>{label}</Text>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Monicon
                name="mdi:close"
                size={24}
                color={lightTheme.colors["primary-purple"]}
              />
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
            keyExtractor={(_, i) => i.toString()}
            contentContainerStyle={{ paddingBottom: 40 }}
            renderItem={({ item }) => {
              const value =
                typeof item === "string"
                  ? item
                  : `${item.city}, ${item.country}`;
              const isSelected = selected.includes(value);
              return (
                <TouchableOpacity
                  onPress={() => toggleSelect(value)}
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
                    {value}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
  },
  inputText: {
    fontFamily: "Lato_400Regular",
    fontSize: 16,
    color: "#444",
    flex: 1,
    marginRight: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
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
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
    elevation: 6,
  },
  drawerHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#CCC",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  drawerTitle: {
    fontFamily: "Lato_700Bold",
    fontSize: 18,
    color: lightTheme.colors["dark-gray"],
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontFamily: "Lato_400Regular",
    fontSize: 15,
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#EEE",
  },
  optionText: {
    fontFamily: "Lato_400Regular",
    fontSize: 15,
  },
});
