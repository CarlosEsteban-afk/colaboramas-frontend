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
  image?: string; // Añadido para consistencia
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
  
  const formatDateTime = (d?: string) => {
    if (!d) return { date: "", time: "" };
    try {
      const parsed = new Date(d);
      if (isNaN(parsed.getTime())) return { date: d, time: "" };
      const day = String(parsed.getDate()).padStart(2, "0");
      const month = String(parsed.getMonth() + 1).padStart(2, "0");
      const year = parsed.getFullYear();
      const hours = String(parsed.getHours()).padStart(2, "0");
      const minutes = String(parsed.getMinutes()).padStart(2, "0");
      return { date: `${day}-${month}-${year}`, time: `${hours}:${minutes}` };
    } catch (e) {
      return { date: d, time: "" };
    }
  };

  const { date: formattedDate, time: formattedTime } = formatDateTime(event.date);
  
  return (
    <>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={{
          width: horizontal ? 260 : "100%",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {/* Parte Superior: Imagen o Placeholder */}
        <View style={{ height: 120, backgroundColor: color }}>
          {event.image ? (
            <Image 
              source={{ uri: event.image }} 
              style={{ width: "100%", height: "100%" }} 
              resizeMode="cover" 
            />
          ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              {/* Puedes poner un ícono o texto aquí si no hay imagen */}
            </View>
          )}
          <View
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: 999,
              paddingHorizontal: 10,
              paddingVertical: 4,
            }}
          >
            <Text style={{ color: "#FFF", fontWeight: "600", fontSize: 10 }}>
              {t(`event.types.${event.type}`, event.type)}
            </Text>
          </View>
        </View>

        {/* Parte Inferior: Contenido con Gradiente */}
        <LinearGradient
          colors={[color, `${color}CC`]}
          style={{ padding: 12, justifyContent: 'space-between', minHeight: 130 }}
        >
          <Text
            numberOfLines={2}
            style={{ fontWeight: "700", fontSize: 15, color: "#FFF", flex: 1 }}
          >
            {displayTitle}
          </Text>

          <View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <Calendar size={14} color="#FFF" />
              <Text style={{ fontSize: 12, color: "#FFF" }}>{formattedDate}{formattedTime ? ` • ${formattedTime}` : ""}</Text>
            </View>

            <Pressable
              style={{
                backgroundColor: "#2995E3",
                borderRadius: 6,
                paddingVertical: 8,
                alignItems: "center",
              }}
              onPress={() => {
                setModalVisible(true);
                if (onPress) onPress();
              }}
            >
              <Text style={{ color: "#FFF", fontWeight: "600" }}>{t("home.details")}</Text>
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
                <Text style={{ color: "#333" }}>{formattedDate}{formattedTime ? ` • ${formattedTime}` : ""}</Text>
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


