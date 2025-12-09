import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../../theme";
import { useUser } from "../../../src/hooks/useUser";
import { useLogout } from "../../../src/hooks/useLogOut";
import ProfileCard from "../../components/ProfileCard";

export const unstable_settings = {
  topBar: "hidden",
};

export default function ProfileScreen() {
  const { user, loading } = useUser();
  const { handleLogout } = useLogout();

  console.log("ROLES:", Array.isArray(user?.roles) ? user.roles : "undefined");
//protejer carga
  if (loading || !user) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#6B31E8" />
        <Text className="text-xl text-primary-purple mt-3">
          Cargando usuario...
        </Text>
      </View>
    );
  }

//evita crasheeo
  const safeRoles = Array.isArray(user.roles) ? user.roles : [];

  const normalizeRole = (role: string) =>
    role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

  const formattedRoles =
    safeRoles.map((r) => normalizeRole(r?.roleName || "")).join(", ") ||
    "Sin rol definido";

  const infoItems = [
    { label: "Email", value: user.email || "No especificado" },
    { label: "Rol", value: formattedRoles },

    {
      label: "Motivaciones",
      value: Array.isArray(user.motivaciones)
        ? user.motivaciones.join("\n")
        : user.motivaciones || "No especificado",
    },
    {
      label: "Intereses personales",
      value: Array.isArray(user.actividadesPersonales)
        ? user.actividadesPersonales.join("\n")
        : user.actividadesPersonales || "No especificado",
    },
    {
      label: "Proyectos",
      value: Array.isArray(user.proyectosRecientes)
        ? user.proyectosRecientes.join("\n")
        : user.proyectosRecientes || "No especificado",
    },
    {
      label: "Ubicación",
      value: `${user.ciudad || "No especificada"}, ${user.pais || ""}`,
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <Text
        className="text-2xl md:text-3xl text-primary-purple font-semibold text-center pt-5"
        style={{ color: lightTheme.colors["primary-purple"] }}
      >
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
          <ProfileCard
            name={user.username || "Usuario"}
            title={formattedRoles}
            location={`${user.ciudad || "No especificada"}, ${user.pais || ""}`}
            tags={[]}
            imageUrl={user.imageUrl}
          />
        </View>

        {infoItems.map((item) => (
          <View key={item.label} className="mb-4 w-full max-w-3xl self-center">
            <GradientLabel text={item.label} />
            <Text className="text-dark-gray text-base ml-2">{item.value}</Text>
          </View>
        ))}

        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "Cerrar sesión",
              "¿Estás seguro que deseas cerrar sesión?",
              [
                { text: "Cancelar", style: "cancel" },
                {
                  text: "Sí, cerrar sesión",
                  style: "destructive",
                  onPress: handleLogout,
                },
              ]
            );
          }}
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
