import React from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  useWindowDimensions,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../theme"; // Asegúrate de que esta ruta sea correcta

type Props = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  card?: boolean;
  cardGradient?: boolean;
};

export default function AuthLayout({
  children,
  title,
  subtitle,
  showLogo = true,
  card = false,
  cardGradient = false,
}: Props) {
  const { height } = useWindowDimensions();
  const isSmallScreen = height < 700;
  const isWeb = Platform.OS === "web";

  return (
    <LinearGradient
      colors={[
        lightTheme.colors["primary-pink"],
        lightTheme.colors["primary-purple"],
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // 🔥 IMPORTANTE
          contentContainerStyle={{
            flexGrow: 1,
            // ❌ ELIMINADO: justifyContent: isWeb ? "flex-start" : "center",
            // Esto permite que el contenido se desplace desde la parte superior
            // cuando el teclado lo empuja.
            alignItems: "center",
            paddingHorizontal: 36,
            paddingVertical: isSmallScreen ? 60 : 160,
          }}
        >
          <View style={{ width: "100%", maxWidth: 480 }}>
            {showLogo && (
              <View style={{ alignItems: "center", marginBottom: 24 }}>
                <Image
                  source={require("../../assets/images/logo.png")} // Asegúrate de que esta ruta sea correcta
                  style={{
                    width: 128,
                    height: 128,
                    resizeMode: "contain",
                  }}
                />
              </View>
            )}

            {title && (
              <Text className="text-3xl font-bold text-center text-white mb-2">
                {title}
              </Text>
            )}

            {subtitle && (
              <Text className="text-sm text-center text-white mb-6 leading-tight">
                {subtitle}
              </Text>
            )}

            {card ? (
              cardGradient ? (
                <LinearGradient
                  colors={[
                    lightTheme.colors["primary-pink"],
                    lightTheme.colors["primary-purple"],
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="rounded-2xl p-6 shadow-md"
                >
                  {children}
                </LinearGradient>
              ) : (
                <View className="bg-white/90 rounded-2xl p-6 shadow-md">
                  {children}
                </View>
              )
            ) : (
              <View style={{ width: "100%" }}>{children}</View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}