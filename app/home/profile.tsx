import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../theme";
import UserCard from "../../components/UserCard";
import BottomBar from "../../components/BottomBar";
import { useUser } from "../../hooks/useUser";

export default function ProfileScreen() {
  const { user}= useUser();

  console.log("Usuario en ProfileScreen:", user);

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.text}>Gestiona tu información personal.</Text>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >

        {/* User Card */}
        <View style={{ marginBottom: 20 }}>
          <UserCard
            name="Alicia Mora"
            title="Psicóloga"
            location="Temuco, Chile"
            tags={[]}
          />
        </View>

        {/* Sections */}
        <View style={styles.section}>
          <GradientLabel text="Educación" />
          <Text style={styles.value}>Universidad de La Frontera</Text>
        </View>

        <View style={styles.section}>
          <GradientLabel text="País" />
          <Text style={styles.value}>Chile</Text>
        </View>

        <View style={styles.section}>
          <GradientLabel text="Ciudad" />
          <Text style={styles.value}>Temuco</Text>
        </View>

        <View style={styles.section}>
          <GradientLabel text="Campos de investigación" />
          <View style={styles.tagContainer}>
            <Text style={[styles.tag, styles.orangeTag]}>Área</Text>
            <Text style={[styles.tag, styles.orangeTag]}>Área</Text>
          </View>
        </View>

        <View style={styles.section}>
          <GradientLabel text="Intereses" />
          <View style={styles.tagContainer}>
            <Text style={[styles.tag, styles.orangeTag]}>Psicología social</Text>
            <Text style={[styles.tag, styles.orangeTag]}>Género</Text>
          </View>
        </View>

        <View style={styles.section}>
          <GradientLabel text="Motivaciones" />
          <Text style={styles.value}>Lorem ipsum...</Text>
        </View>

        <View style={styles.section}>
          <GradientLabel text="Intereses personales" />
          <Text style={styles.value}>Trekking, Pádel, etc</Text>
        </View>

        <View style={styles.section}>
          <GradientLabel text="Proyectos" />
          <Text style={styles.value}>Proyecto 1</Text>
          <Text style={styles.value}>Proyecto 2</Text>
        </View>
      </ScrollView>
    </View>
  );
}

/* 🔹 Subcomponente para etiquetas con gradiente */
function GradientLabel({ text }: { text: string }) {
  return (
    <LinearGradient
      colors={[lightTheme.colors["purple-light"], lightTheme.colors["pink-light"]]}
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
    alignSelf:"center",
    paddingTop: 20
  },
  text: {
    color: lightTheme.colors["dark-gray"],
    alignSelf:"center",
    marginBottom: 20
  },
  section: {
    width: "90%",
    marginBottom: 16,
    alignSelf: "stretch"
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
    marginLeft: 20
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
