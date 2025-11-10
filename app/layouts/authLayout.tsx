import React from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../theme";

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
  const { height } = Dimensions.get("window");

  return (
    <LinearGradient
      colors={[
        lightTheme.colors["primary-pink"],
        lightTheme.colors["primary-purple"],
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 28,
            paddingVertical: height < 700 ? 40 : 70,
            alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          {showLogo && (
            <View className="items-center mb-6">
              <View className="w-24 h-24 rounded-full bg-white/20 border border-white/50 justify-center items-center">
                <Text className="text-white text-sm">Logo App</Text>
              </View>
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
                className="rounded-2xl p-6 w-full shadow-md"
              >
                {children}
              </LinearGradient>
            ) : (
              <View className="bg-white/90 rounded-2xl p-6 w-full shadow-md">
                {children}
              </View>
            )
          ) : (
            <View className="w-full">{children}</View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
