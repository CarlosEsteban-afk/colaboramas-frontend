import React, { useState } from "react";
import { View, Text, Pressable, Modal, ScrollView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { Calendar } from "lucide-react-native";

export type EventItem = {
  id: string;
  title: string;
  date: string;
  place: string;
  type: string;
  description?: string;
  image?: string;
};

type Props = {
  event: EventItem;
  onPress?: () => void;
};

const TYPE_COLOR: Record<string, string> = {
  Congreso: "#6B31E8",
  Concurso: "#E91E63",
  Charla: "#EE6C21",
  Conferencia: "#82A50B",
};

export default function EventCardRight({ event, onPress }: Props) {
  const { t } = useTranslation();
  const color = TYPE_COLOR[event.type] ?? "#6B31E8";
  const [modalVisible, setModalVisible] = useState(false);

  const displayTitle = event.title.replace(
    new RegExp(`^\\s*${event.type}\\s*[:\\-–—]\\s*`, "i"),
    ""
  ).trim();

  return (
    <>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={{
          flexDirection: "row",
          borderRadius: 8,
          backgroundColor: "#F6F6F6",
          overflow: "hidden",
          alignItems: "stretch", // Cambiado para que ambos lados ocupen toda la altura
        }}
      >
        {/* Parte Izquierda: Imagen */}
        <View style={{ width: 120 }}>
          {event.image ? (
            <Image
              source={{ uri: event.image }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          ) : (
            <LinearGradient
              colors={[color, `${color}CC`]}
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                {t(`event.types.${event.type}`, event.type)}
              </Text>
            </LinearGradient>
          )}
          <View
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              backgroundColor: "rgba(255,255,255,0.25)",
              borderRadius: 999,
              paddingHorizontal: 8,
              paddingVertical: 4,
            }}
          >
            <Text style={{ color: "#FFF", fontWeight: "600", fontSize: 10 }}>
              {t(`event.types.${event.type}`, event.type)}
            </Text>
          </View>
        </View>

        {/* Parte Derecha: Contenido */}
        <LinearGradient
          colors={[color, `${color}CC`]}
          style={{ flex: 1, padding: 12, justifyContent: "space-between" }}
        >
          <Text
            numberOfLines={3} // Aumentado para más espacio
            style={{ fontWeight: "700", fontSize: 15, color: "#FFF" }}
          >
            {displayTitle}
          </Text>

          <View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <Calendar size={14} color="#FFF" />
              <Text style={{ fontSize: 12, color: "#FFF", flex: 1 }}>
                {event.date}
              </Text>
            </View>

            <Pressable
              style={{
                backgroundColor: "#2995E3", // Color azul para el botón
                borderRadius: 6,
                paddingVertical: 8,
                paddingHorizontal: 12,
                alignItems: "center",
              }}
              onPress={() => {
                setModalVisible(true);
                if (onPress) onPress();
              }}
            >
              <Text style={{ color: "#FFF", fontWeight: "600" }}>
                {t("home.details")}
              </Text>
            </Pressable>
          </View>
        </LinearGradient>
      </Pressable>

      {/* Modal con la información completa del evento */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "center", padding: 20 }}>
          <View style={{ borderRadius: 8, overflow: "hidden", backgroundColor: "#fff", maxHeight: "85%" }}>
            <LinearGradient
              colors={[color, `${color}CC`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ padding: 14, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
            >
              <Text style={{ color: "#FFF", fontWeight: "700", fontSize: 16 }}>
                {t(`event.types.${event.type}`, event.type)}
              </Text>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={{ backgroundColor: "rgba(255,255,255,0.18)", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 }}
                accessibilityLabel="Cerrar"
              >
                <Text style={{ color: "#FFF", fontWeight: "700", fontSize: 16 }}>X</Text>
              </Pressable>
            </LinearGradient>

            <ScrollView style={{ padding: 14 }}>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: "700", fontSize: 18, marginBottom: 6 }}>{displayTitle}</Text>
              </View>
  
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: "700", marginBottom: 4 }}>{t("event.place") ?? "Lugar"}</Text>
                <Text style={{ color: "#333" }}>{event.place}</Text>
              </View>
  
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: "700", marginBottom: 4 }}>{t("event.date") ?? "Fecha"}</Text>
                <Text style={{ color: "#333" }}>{event.date}</Text>
              </View>
  
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: "700", marginBottom: 4 }}>{t("event.description") ?? "Descripción"}</Text>
                <Text style={{ color: "#333" }}>{event.description}</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}