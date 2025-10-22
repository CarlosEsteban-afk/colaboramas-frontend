import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Monicon } from "@monicon/native";
import { lightTheme } from "../theme";

export default function TopBar({ onConfigPress }) {
  return (
    <LinearGradient
      colors={[lightTheme.colors["primary-pink"], lightTheme.colors["primary-purple"]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ height: 80, paddingTop: 20 }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1, paddingHorizontal: 16 }}>
        
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: "#fff", 
            marginRight: 8, 
          }}
        />

        {/* Título de la app */}
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", flex: 1 }}>
          Colaboramas
        </Text>

        {/* Icono de configuración */}
        <TouchableOpacity activeOpacity={0.7} onPress={onConfigPress}>
          <Monicon name="mdi:cog" size={28} color={lightTheme.colors["accent-purple"]} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
