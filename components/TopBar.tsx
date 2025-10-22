import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Monicon } from "@monicon/native";
import { lightTheme } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TopBar({ onConfigPress }) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[
        lightTheme.colors["primary-pink"],
        lightTheme.colors["primary-purple"],
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className="h-24"
      style={{ paddingTop: insets.top + 10, paddingBottom: 10 }}
    >
      <View
        className="flex-row items-center justify-center px-4"
        style={{ flex: 1 }}
      >
        <View className="w-9 h-9 rounded-full mr-2 overflow-hidden bg-white">
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Logo_Nuevo_Ufro.png/1200px-Logo_Nuevo_Ufro.png",
            }}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>

        <Text className="text-white text-lg font-bold flex-1 text-center">
          Colaboramas
        </Text>

        <TouchableOpacity activeOpacity={0.7} onPress={onConfigPress}>
          <Monicon
            name="mdi:cog"
            size={28}
            color={lightTheme.colors["accent-purple"]}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
