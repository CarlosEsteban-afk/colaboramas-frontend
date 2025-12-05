import { useState, useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import i18n from "../../i18n";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

export default function useSettings() {
  const router = useRouter();
  const { t } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(
    i18n.isInitialized ? i18n.language : "en"
  );

  useEffect(() => {
    const handleLanguageChange = (lng: string) => setCurrentLanguage(lng);
    i18n.on("languageChanged", handleLanguageChange);
    return () => i18n.off("languageChanged", handleLanguageChange);
  }, []);

  const toggleLanguage = () => {
    const newLang = currentLanguage === "en" ? "es" : "en";
    i18n.changeLanguage(newLang);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    confirmText: "",
    onConfirm: () => {},
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const startFadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 180,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const openModal = (config: any) => {
    setModalConfig(config);
    setModalVisible(true);
    startFadeIn();
  };

  const closeModal = () => setModalVisible(false);

  const logout = async () => {
    await AsyncStorage.removeItem("auth_token");
    router.replace("/auth/login");
  };

  const configs = [
    {
      label: t("settings.language"),
      value: currentLanguage === "en" ? "English" : "Español",
      icon: "mdi:translate-variant",
      onPress: toggleLanguage,
    },
    {
      label: t("settings.privacy"),
      value: t("settings.termsOfService"),
      icon: "mdi:shield-check",
      onPress: undefined,
    },
    {
      label: t("settings.about"),
      value: t("settings.appInfo"),
      icon: "mdi:help-circle",
      onPress: undefined,
    },
  ];

  return {
    t,
    currentLanguage,
    configs,
    modalVisible,
    modalConfig,
    fadeAnim,
    openModal,
    closeModal,
    logout,
  };
}
