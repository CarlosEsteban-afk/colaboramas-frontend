import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../../theme";
import ContactsTab from "../../components/ContactsTab";
import { useTranslation } from "react-i18next";

export default function ContactsScreen() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<"recibidas" | "enviadas" | "contestadas">("recibidas");

  return (
    <View className="flex-1 bg-white items-center pt-5">
      <Text
        className="text-2xl font-semibold mb-1"
        style={{ color: lightTheme.colors["primary-purple"] }}
      >
        {t("contacts.title")}
      </Text>

      <Text className="mb-5" style={{ color: lightTheme.colors["dark-gray"] }}>
        {t("contacts.description")}
      </Text>

      <LinearGradient
        colors={[lightTheme.colors["primary-purple"], lightTheme.colors["primary-pink"]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="flex-row w-[90%] rounded-md justify-between mb-5 overflow-hidden"
      >
        <View
          className="absolute inset-0 opacity-[0.01]"
          style={{ backgroundColor: lightTheme.colors["primary-purple"] }}
        />

        {(["recibidas", "enviadas", "contestadas"] as const).map((tKey) => {
          const active = tab === tKey;

          return (
            <TouchableOpacity
              key={tKey}
              onPress={() => setTab(tKey)}
              activeOpacity={1}
              className="flex-1 items-center py-2"
              style={
                active
                  ? {
                      backgroundColor: lightTheme.colors["dark-gray"],
                      opacity: 0.6,
                    }
                  : {}
              }
            >
              <Text className="text-base font-medium text-white">
                {t(`contacts.tabs.${tKey}`)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </LinearGradient>

      <ScrollView
        className="w-[90%]"
        contentContainerStyle={{ paddingVertical: 16, gap: 12, paddingBottom: 100 }}
      >
        <ContactsTab type={tab} />
      </ScrollView>
    </View>
  );
}
