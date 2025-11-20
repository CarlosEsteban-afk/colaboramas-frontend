import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../theme";
import UserCard from "../components/UserCard";
import { useUser } from "../../src/hooks/useUser";
import { useLogout } from "../../src/hooks/useLogOut";

export default function ProfileScreen() {
  const { user } = useUser();
  const { handleLogout } = useLogout();
  const normalizeRole = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  };
  const formattedRoles =
    user.roles?.map(normalizeRole).join(", ") || "Sin rol definido";

  console.log("User data:", user);
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando usuario...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.text}>Gestiona tu información personal.</Text>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: 20 }}>
          <UserCard
            name={user.username}
            title={formattedRoles}
            location={`${user.ciudad || "No especificada"}, ${user.pais || ""}`}
            tags={[]}
            imageUrl={user.imageUrl}
            isOwnProfile={true}
          />
        </View>

        <View style={styles.section}>
          <GradientLabel text="Email" />
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.section}>
          <GradientLabel text="Rol" />
          <Text style={styles.value}>{formattedRoles}</Text>
        </View>
        <View style={styles.section}>
          <GradientLabel text="Motivaciones" />
          <Text style={styles.value}>
            {Array.isArray(user.motivaciones)
              ? user.motivaciones.join("\n")
              : user.motivaciones}
          </Text>
        </View>

        <View style={styles.section}>
          <GradientLabel text="Intereses personales" />
          <Text style={styles.value}>
            {Array.isArray(user.actividadesPersonales)
              ? user.actividadesPersonales.join("\n")
              : user.actividadesPersonales}
          </Text>
        </View>

        <View style={styles.section}>
          <GradientLabel text="Proyectos" />
          <Text style={styles.value}>
            {Array.isArray(user.proyectosRecientes)
              ? user.proyectosRecientes.join("\n")
              : user.proyectosRecientes}
          </Text>
        </View>

        <View style={styles.section}>
          <GradientLabel text="Ubicacion" />
          <Text style={styles.value}>{`${user.ciudad || "No especificada"}, ${
            user.pais || ""
          }`}</Text>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          className="w-[90%] self-center mt-6 bg-red-500 py-3 rounded-xl shadow"
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
      style={styles.gradientLabel}
    >
      <Text style={styles.gradientLabelText}>{text}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContainer: {
    paddingBottom: 120,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: lightTheme.colors["primary-purple"],
    alignSelf: "center",
    paddingTop: 20,
  },
  text: {
    color: lightTheme.colors["dark-gray"],
    alignSelf: "center",
    marginBottom: 20,
  },
  section: {
    width: "90%",
    marginBottom: 16,
    alignSelf: "stretch",
  },
  gradientLabel: {
    alignSelf: "flex-start",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 6,
  },
  gradientLabelText: {
    color: "#FFF",
    fontWeight: "500",
    fontSize: 14,
  },
  value: {
    color: lightTheme.colors["dark-gray"],
    fontSize: 15,
    marginLeft: 20,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
    marginLeft: 20,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    color: "#FFF",
    fontSize: 13,
    fontWeight: "500",
  },
  orangeTag: {
    backgroundColor: lightTheme.colors["orange"],
  },
});
