import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Monicon } from "@monicon/native";
import { lightTheme } from "../../theme";
import { useRouter } from "expo-router";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next"; 

export default function Settings() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useTranslation();//inicializa el i18n
  const [currentLanguage, setCurrentLanguage] = useState(
    i18n.isInitialized ? i18n.language : 'en'
  );

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  const configs = [
    { 
      label: t("settings.language"), 
      value: currentLanguage === 'en' ? "English" : "Español", 
      icon: "mdi:translate-variant",
      onPress: toggleLanguage
    },
    { 
      label: t("settings.privacy"), 
      value: t("settings.termsOfService"), 
      icon: "mdi:shield-check" 
    }, { 
      label: t("settings.about"), 
      value: t("settings.appInfo"), 
      icon: "mdi:help-circle" 
    },];

  return (
    <SafeAreaView
      className="flex-1 bg-color-light-base-muted-foreground p-4"
      style={{ paddingTop: insets.top + 16 }}
    >
      {/* Botón de volver */}
      <TouchableOpacity
        className="mb-4 flex-row items-center"
        activeOpacity={0.7}
        onPress={() => router.back()}
      >
        <Monicon
          name="mdi:arrow-left"
          size={24}
          color={lightTheme.colors["primary-purple"]}
        />
        <Text className="ml-2 text-base font-semibold text-primary-purple">{t("settings.back")}</Text>
      </TouchableOpacity>

      {/* Título */}
      <Text className="text-xl font-bold text-center mb-4">
        {t("settings.title")}
      </Text>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white rounded-lg overflow-hidden shadow-sm flex-1">
          {configs.map((conf, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                className="flex-row items-center p-4"
                activeOpacity={0.7}
                onPress={conf.onPress || (() => console.log(`${conf.label} pressed`))}
              >
                <Monicon
                  name={conf.icon}
                  size={24}
                  color={lightTheme.colors["primary-purple"]}
                />

                <View className="flex-1 ml-3">
                  <Text className="text-base font-semibold">{conf.label}</Text>
                  {conf.value ? (
                    <Text className="text-sm text-gray-500">{conf.value}</Text>
                  ) : null}
                </View>
              </TouchableOpacity>

              {index < configs.length - 1 && (
                <View className="h-[1px] bg-gray-200 mx-4" />
              )}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>

      {/* Botón rojo de eliminar cuenta - Fixed at bottom */}
      <View className="bg-white rounded-lg shadow-sm mt-4">
        <TouchableOpacity
          className="p-6 items-center"
          activeOpacity={0.7}
          onPress={() => console.log("Eliminar cuenta pressed")}
        >
          <Text className="text-red-600 font-semibold text-base"> {t("settings.deleteAccount")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
