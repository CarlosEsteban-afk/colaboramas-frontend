import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../theme";
import { useTranslation } from "react-i18next";

export type EventItem = {
  id: string;
  title: string;
  date: string;
  place: string;
  type: string;
  description?: string;
};

type Props = {
  event: EventItem;
  active?: boolean;
  onToggleActive?: () => void;
  onViewDetails?: () => void;
  horizontal?: boolean;
};

const TYPE_COLOR: Record<string, string> = {
  Congreso: "#6B31E8",
  CONGRESO: "#6B31E8",
  Concurso: "#E91E63",
  CONCURSO: "#E91E63",
  Charla: "#EE6C21",
  CHARLA: "#EE6C21",
  Conferencia: "#82A50B",
  CONFERENCIA: "#82A50B",
};

export default function AdminEventCard({ event, active = true, onToggleActive, onViewDetails, horizontal = false, }: Props) {
  const { t } = useTranslation();
  const rawType = event?.type ?? "";
  const typeKey = String(rawType);
  const upperType = typeKey.toUpperCase();
  const color = TYPE_COLOR[typeKey] ?? TYPE_COLOR[upperType] ?? "#6B31E8";
  const displayTitle = String(event.title || "").replace(
    new RegExp(`^\\s*${typeKey}\\s*[:\\-–—]\\s*`, "i"),
    ""
  ).trim();

  return (
    <View style={[styles.wrapper, horizontal && styles.horizontal]}>
      <View style={styles.row}>
        {/* Left: Image or gradient */}
        <View style={styles.imageContainer}>
          {event.image ? (
            <Image source={{ uri: event.image }} style={styles.image} resizeMode="cover" />
          ) : (
            <LinearGradient colors={[color, `${color}CC`]} style={styles.imageGradient}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>{t(`event.types.${event.type}`, event.type)}</Text>
            </LinearGradient>
          )}

          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeText}>{t(`event.types.${event.type}`, upperType)}</Text>
          </View>
        </View>

        {/* Right: Gradient content */}
        <LinearGradient colors={[color, `${color}CC`]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.content}>
          <Text numberOfLines={3} style={styles.titleRight}>{displayTitle || event.title}</Text>

          <View>
            <View style={styles.metaRow}>
              <Text style={{ color: '#FFF', fontSize: 14, marginRight: 6 }}>📅</Text>
              <Text style={styles.metaText}>{event.date}</Text>
            </View>

            <View style={styles.actionsRowRight}>
              <TouchableOpacity style={[styles.smallBtn, { backgroundColor: color }]} onPress={() => { /* type action */ }}>
                <Text style={styles.smallBtnText}>{upperType}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.smallBtn, { backgroundColor: lightTheme.colors["accent-blue"] }]} onPress={onViewDetails}>
                <Text style={styles.smallBtnText}>Detalles</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.smallBtn, active ? styles.activeBtn : styles.inactiveBtn]} onPress={onToggleActive}>
                <Text style={styles.smallBtnText}>{active ? "Activo" : "Inactivo"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginBottom: 12,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  horizontal: {
    width: 260,
  },
  header: {
    padding: 12,
    paddingBottom: 10,
  },
  typePill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  typeText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 12,
  },
  title: {
    color: "#FFF",
    fontWeight: "700",
    marginTop: 10,
    fontSize: 14,
  },
  body: {
    padding: 12,
    gap: 6,
    backgroundColor: "transparent",
  },
  place: { fontSize: 12, color: "#555" },
  date: { fontSize: 12, color: "#555" },
  actionsRow: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  actionText: {
    color: lightTheme.colors.background,
    fontWeight: "700",
    fontSize: 13,
  },
  activeBtn: {
    backgroundColor: "#4CAF50",
  },
  inactiveBtn: {
    backgroundColor: "#e74c3c",
  },
  /* new layout styles for image-left card */
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    overflow: "hidden",
  },
  imageContainer: {
    width: 120,
    height: 120,
    backgroundColor: "#eee",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  typeBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  typeBadgeText: { color: "#FFF", fontWeight: "600", fontSize: 10 },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  titleRight: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 15,
  },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 },
  metaText: { fontSize: 12, color: "#FFF" },
  actionsRowRight: { marginTop: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  smallBtn: { paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, marginLeft: 6, alignItems: "center", minWidth: 80 },
  smallBtnText: { color: lightTheme.colors.background, fontWeight: "700", fontSize: 13 },
});
