import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../../theme";
import UserCard from "../../components/UserCard";
import { useUser } from "../../../src/hooks/useUser";
import { useLogout } from "../../../src/hooks/useLogOut";

export const unstable_settings = {
  topBar: "hidden",
};

export default function ProfileScreen() {
  const { user } = useUser();
  const { handleLogout } = useLogout();

  const normalizeRole = (role: string) =>
    role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

  const formattedRoles =
    user?.roles?.map(normalizeRole).join(", ") || "Sin rol definido";

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-xl text-primary-purple font-semibold">
          Cargando usuario...
        </Text>
      </View>
    );
  }

  const infoItems = [
    { label: "Email", value: user.email },
    { label: "Rol", value: formattedRoles },
    {
      label: "Motivaciones",
      value: Array.isArray(user.motivaciones)
        ? user.motivaciones.join("\n")
        : user.motivaciones,
    },
    {
      label: "Intereses personales",
      value: Array.isArray(user.actividadesPersonales)
        ? user.actividadesPersonales.join("\n")
        : user.actividadesPersonales,
    },
    {
      label: "Proyectos",
      value: Array.isArray(user.proyectosRecientes)
        ? user.proyectosRecientes.join("\n")
        : user.proyectosRecientes,
    },
    {
      label: "Ubicacion",
      value: `${user.ciudad || "No especificada"}, ${user.pais || ""}`,
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <Text className="text-2xl md:text-3xl text-primary-purple font-semibold text-center pt-5">
        Perfil
      </Text>
      <Text className="text-dark-gray text-center mb-5">
        Gestiona tu información personal.
      </Text>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 0 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-5 px-4">
          <UserCard
            name={user.username}
            title={formattedRoles}
            location={`${user.ciudad || "No especificada"}, ${user.pais || ""}`}
            tags={[]}
            imageUrl={user.imageUrl}
            isOwnProfile={true}
          />
        </View>

        {infoItems.map((item) => (
          <View
            key={item.label}
            className="mb-4 w-full max-w-3xl self-center"
          >
            <GradientLabel text={item.label} />
            <Text className="text-dark-gray text-base ml-2">{item.value}</Text>
          </View>
        ))}

        <TouchableOpacity
          onPress={handleLogout}
          className="w-[80%] max-w-3xl self-center mt-6 bg-red-500 py-3 rounded-xl shadow"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function GradientLabel({ text }: { text: string }) {
  return (
    <LinearGradient
      colors={[
        lightTheme.colors["purple-light"],
        lightTheme.colors["pink-light"],
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="self-start rounded-r-xl px-2.5 py-1 mb-1.5"
    >
      <Text className="text-white font-medium text-sm">{text}</Text>
    </LinearGradient>
  );
}
