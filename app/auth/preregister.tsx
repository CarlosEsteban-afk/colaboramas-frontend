import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import AuthLayout from "../layouts/authLayout";
import { router } from "expo-router";

export default function PreRegister() {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(Math.max(width * 0.85, 300), 500);

  const handleSelectRole = (role: "ACADEMICO" | "COMUNICADOR") => {
    router.push({
      pathname: "/auth/register",
      params: { role },
    });
  };

  return (
    <AuthLayout
      showLogo
      title="Conecta con tu comunidad"
      subtitle="La plataforma que une investigadores y comunicadores para crear colaboraciones"
      card={false}
    >
      <TouchableOpacity
        style={{ width: cardWidth, alignSelf: "center" }}
        className="rounded-xl p-5 border-2 border-purple-500 bg-[#A881FD] mb-8 shadow-md"
        onPress={() => handleSelectRole("ACADEMICO")}
        activeOpacity={0.9}
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
        style={{ width: cardWidth, alignSelf: "center" }}
        className="rounded-2xl p-5 bg-[#EC6895] border border-pink-400 shadow-md mb-12"
        onPress={() => handleSelectRole("COMUNICADOR")}
        activeOpacity={0.9}
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

      <TouchableOpacity
        onPress={() => router.back()}
        className="mt-4"
        activeOpacity={0.8}
        style={{ width: cardWidth, alignSelf: "center" }}
      >
        <View className="p-3 rounded-xl bg-blue-500 shadow">
          <Text className="text-center text-white font-semibold text-base">
            Volver
          </Text>
        </View>
      </TouchableOpacity>
    </AuthLayout>
  );
}
