import React, { useState } from "react";
import { View, Text, Pressable, Modal, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";

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
  horizontal?: boolean;
};

const TYPE_COLOR: Record<string, string> = {
  Congreso: "#6B31E8",
  Concurso: "#E91E63",
  Charla: "#EE6C21",
  Conferencia: "#82A50B",
};

export default function EventCard({ event, onPress, horizontal = false }: Props) {
  const { t } = useTranslation();
  const color = TYPE_COLOR[event.type] ?? "#6B31E8";
  const [modalVisible, setModalVisible] = useState(false);

  // Mostrar título sin el prefijo del tipo (ej. quitar "Charla:" si existe)
  const displayTitle = event.title.replace(
    new RegExp(`^\\s*${event.type}\\s*[:\\-–—]\\s*`, "i"),
    ""
  ).trim();
  
  return (
    <>
      <View
        style={{
          width: horizontal ? 260 : "100%",
          borderRadius: 6,
          backgroundColor: "#F6F6F6",
          overflow: "hidden",
        }}
      >
        <LinearGradient
          colors={[color, `${color}CC`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            padding: 12,
            paddingBottom: 10,
          }}
        >
          <View
            style={{
              alignSelf: "flex-start",
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: 999,
              paddingHorizontal: 10,
              paddingVertical: 4,
            }}
          >
            <Text style={{ color: "#FFF", fontWeight: "600" }}>
              {t(`event.types.${event.type}`, event.type)}
            </Text>
          </View>

          {/* Placeholder para una imagen/portada del evento */}
          <View
            style={{
              height: 110,
              borderRadius: 6,
              backgroundColor: "rgba(255,255,255,0.25)",
              marginTop: 10,
            }}
          />
        </LinearGradient>

        <View style={{ padding: 12, gap: 6 }}>
          <Text
            numberOfLines={2}
            style={{ fontWeight: "700", fontSize: 14, color: "#222" }}
          >
            {event.title}
          </Text>
          <Text style={{ fontSize: 12, color: "#555" }}>{event.place}</Text>
          <Text style={{ fontSize: 12, color: "#555" }}>{event.date}</Text>

          <View
            style={{
              marginTop: 8,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Pressable
              style={{
                borderRadius: 6,
                borderWidth: 1,
                borderColor: color,
                paddingVertical: 6,
                paddingHorizontal: 10,
              }}
              onPress={() => {
                setModalVisible(true);
                if (onPress) onPress();
              }}
            >
              <Text style={{ color: color, fontWeight: "600" }}>{t("home.details")}</Text>
            </Pressable>
          </View>
        </View>
      </View>

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
              {/* Banner: mostrar SOLO el tipo (ej. "Charla") */}
              <Text style={{ color: "#FFF", fontWeight: "700", fontSize: 16 }}>
                {t(`event.types.${event.type}`, event.type)}
              </Text>
              {/* Close como una 'X' */}
              <Pressable
                onPress={() => setModalVisible(false)}
                style={{ backgroundColor: "rgba(255,255,255,0.18)", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 }}
                accessibilityLabel="Cerrar"
              >
                <Text style={{ color: "#FFF", fontWeight: "700", fontSize: 16 }}>X</Text>
              </Pressable>
            </LinearGradient>

            <ScrollView style={{ padding: 14 }}>
              {/* Título del evento (ahora mostrado en el cuerpo del modal) */}
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
  
              {/* ID oculto por petición */}
  
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: "700", marginBottom: 4 }}>{t("event.description") ?? "Descripción"}</Text>
                <Text style={{ color: "#333" }}>{event.description}</Text>
              </View>
  
              {/* Si desea agregar más campos (descripción, ponentes, etc.), incluir aquí */}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}


