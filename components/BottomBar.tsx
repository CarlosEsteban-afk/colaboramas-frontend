import React, { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Monicon } from "@monicon/native";
import { lightTheme } from "../theme";

export default function BottomBar() {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { label: "Inicio", icon: "mdi:home-outline" },
    { label: "Buscar", icon: "feather:search" },
    { label: "Eventos", icon: "mdi:calendar" },
    { label: "Notificaciones", icon: "fluent:alert-20-regular" },
    { label: "Perfil", icon: "mdi:account-circle-outline" },
  ];

  return (
    <LinearGradient
      colors={[
        lightTheme.colors["primary-purple"],
        lightTheme.colors["primary-pink"],
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-row h-24"
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setActiveIndex(index)}
            className={`flex-1 justify-center items-center ${
              isActive ? "bg-white/20" : ""
            }`} 
          >
            <Monicon
              name={item.icon}
              size={isActive ? 32 : 28} 
              color={isActive ? "#FFD700" : "#fff"}
            />
            <Text
              className={`text-sm mt-1 ${
                isActive ? "text-yellow-400 font-bold" : "text-white"
              }`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
}
