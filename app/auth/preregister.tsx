import React from "react";
import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../theme";
import { router } from "expo-router";

export default function CommunityConnectCard() {
  return (
    <LinearGradient
      colors={[
        lightTheme.colors["primary-pink"],
        lightTheme.colors["primary-purple"],
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 justify-center items-center px-6 py-12"
    >
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-24 h-24 bg-violet-700 rounded-2xl mb-6 justify-center items-center shadow-lg">
          <View className="w-12 h-10 bg-violet-400 rounded-md" />
        </View>

        <View className="w-80 mb-10">
          <Text className="text-white text-xl font-bold text-center mb-1">
            Conecta con tu comunidad
          </Text>
          <Text className="text-white text-sm font-medium text-center opacity-90">
            La plataforma que une investigadores y comunicadores para crear
            colaboraciones
          </Text>
        </View>

        <TouchableOpacity
          className="w-80 rounded-2xl p-5 border-2 border-purple-500 bg-[#A881FD] mb-8 shadow-md"
          onPress={() => router.push("/auth/register")}
        >
          <Text className="text-black text-lg font-semibold text-center mb-1">
            Investigadores
          </Text>
          <Text className="text-black text-sm font-medium text-center mb-4">
            Académicos y estudiantes de postgrado
          </Text>

          {[
            "Comparte intereses y proyectos",
            "Conecta con otros investigadores",
            "Conoce eventos y concursos",
          ].map((txt, i) => (
            <View
              key={i}
              className="bg-white border border-purple-400 rounded-full py-2 mb-2"
            >
              <Text className="text-center text-purple-600 text-xs font-semibold">
                {txt}
              </Text>
            </View>
          ))}
        </TouchableOpacity>

        <TouchableOpacity
          className="w-80 rounded-2xl p-5 bg-[#EC6895] border border-pink-400 shadow-md"
          onPress={() => router.push("/auth/register")}
        >
          <Text className="text-black text-lg font-semibold text-center mb-1">
            Comunicador/a
          </Text>
          <Text className="text-black text-sm font-medium text-center mb-4">
            Periodistas, divulgadores y profesionales de comunicación
          </Text>

          {["Comparte intereses y proyectos", "Conecta con investigadores"].map(
            (txt, i) => (
              <View
                key={i}
                className="bg-white border border-pink-400 rounded-full py-2 mb-2"
              >
                <Text className="text-center text-pink-600 text-xs font-semibold">
                  {txt}
                </Text>
              </View>
            )
          )}
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}
