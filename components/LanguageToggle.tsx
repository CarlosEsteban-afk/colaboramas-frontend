import React, { useCallback, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import i18n, { supportedLanguages } from "../i18n";

type LanguageCode = "en" | "es";

export default function LanguageToggle() {
  const [current, setCurrent] = useState<LanguageCode>(
    (i18n.language as LanguageCode) || "en"
  );

  const nextLang = useMemo<LanguageCode>(() => {
    return current === "en" ? "es" : "en";
  }, [current]);

  const handleToggle = useCallback(() => {
    const target = nextLang;
    if (!supportedLanguages.includes(target)) return;
    i18n.changeLanguage(target).then(() => setCurrent(target as LanguageCode));
  }, [nextLang]);

  return (
    <Pressable onPress={handleToggle} accessibilityRole="button">
      <View
        style={{
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 16,
          backgroundColor: "#2563eb",
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>
          {current === "en" ? "ES" : "EN"}
        </Text>
      </View>
    </Pressable>
  );
}


