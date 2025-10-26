import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../theme";

interface Props {
  type: "recibidas" | "enviadas" | "contestadas";
}

export default function ContactsTab({ type }: Props) {
  const example = [
    {
      name: "Alicia Mora",
      university: "Universidad XYZ",
      message:
        "Hola, he visto tu perfil y creo que podríamos colaborar en investigación sobre neuroplasticidad.",
      status: "pendiente",
    },
    {
      name: "María Silva",
      university: "Universidad XYZ",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: type === "contestadas" ? "aceptada" : "pendiente",
    },
  ];

  return (
    <View style={{ gap: 10 }}>
      {example.map((c, index) => (
        <LinearGradient
          key={index}
          colors={[lightTheme.colors["primary-pink"], lightTheme.colors["primary-purple"]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.innerCard}>
            <Text style={styles.name}>{c.name}</Text>
            <Text style={styles.university}>{c.university}</Text>
            <Text style={styles.message}>{c.message}</Text>

            {/* Botones dinámicos */}
            {type === "recibidas" && (
              <View style={styles.row}>
                <TouchableOpacity style={[styles.btn, { backgroundColor: lightTheme.colors["pink-light"] }]}>
                  <Text style={styles.btnText}>Rechazar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, { backgroundColor: lightTheme.colors["primary-pink"] }]}>
                  <Text style={styles.btnText}>Aceptar</Text>
                </TouchableOpacity>
              </View>
            )}

            {type === "enviadas" && (
              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity style={[styles.btn, { backgroundColor: lightTheme.colors["orange"] }]}>
                  <Text style={styles.btnText}>Pendiente</Text>
                </TouchableOpacity>
              </View>
            )}

            {type === "contestadas" && (
              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity
                  style={[
                    styles.btn,
                    {
                      backgroundColor:
                        c.status === "aceptada" ? "#82A50B" : "#E91E63",
                    },
                  ]}
                >
                  <Text style={styles.btnText}>
                    {c.status === "aceptada" ? "Aceptada" : "Rechazada"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </LinearGradient>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    padding: 2,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  innerCard: {
    borderRadius: 6,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#ffff",
  },
  university: {
    color: "#fff",
    marginBottom: 8,
  },
  message: {
    marginBottom: 12,
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  btn: {
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  btnText: {
    color: "#FFF",
    fontWeight: "600",
  },
});
