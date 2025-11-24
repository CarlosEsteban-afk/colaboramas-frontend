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

  const { t } = useTranslation();

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

      <TouchableOpacity
        style={styles.input}
        onPress={() => setOpen(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.inputText}>
          {selected.length > 0
            ? selected.join(", ")
            : t("multiSelect.placeholder")}
        </Text>
        <Monicon
          name="mdi:chevron-down"
          size={22}
          color={lightTheme.colors["primary-purple"]}
        />
      </TouchableOpacity>

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
