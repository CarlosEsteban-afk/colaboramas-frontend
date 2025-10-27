import React from "react";
import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";

export type EventItem = {
  id: string;
  title: string;
  date: string;
  place: string;
  type: string;
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

export default function EventCard({ event, onPress }: Props) {
  const { t } = useTranslation();
  const color = TYPE_COLOR[event.type] ?? "#6B31E8";

  return (
    <View
      style={{
        width: "100%",
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
            onPress={onPress}
          >
            <Text style={{ color: color, fontWeight: "600" }}>{t("home.details")}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}


