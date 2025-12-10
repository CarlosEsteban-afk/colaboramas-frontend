import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Pressable, ScrollView } from "react-native";
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
  image?: string;
  imageUrl?: string;
  ubication?: string;
};

type Props = {
  event: EventItem;
  active?: boolean;
  onToggleActive?: () => void;
  onViewDetails?: () => void;
  onChangeType?: (newType: string) => void;
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

export default function AdminEventCard({ event, active = true, onToggleActive, onViewDetails, onChangeType, horizontal = false, }: Props) {
  const { t } = useTranslation();
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const rawType = event?.type ?? "";
  const typeKey = String(rawType);
  const upperKey = typeKey.toUpperCase();
  const displayType = typeKey ? typeKey.charAt(0).toUpperCase() + typeKey.slice(1).toLowerCase() : "";
  const color = TYPE_COLOR[typeKey] ?? TYPE_COLOR[upperKey] ?? "#6B31E8";
  const displayTitle = String(event.title || "").replace(
    new RegExp(`^\\s*${typeKey}\\s*[:\\-–—]\\s*`, "i"),
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
      <View style={[styles.wrapper, horizontal && styles.horizontal]}>
        <View style={styles.row}>
        {/* Left: Image or gradient */}
        <View style={styles.imageContainer}>
          {(event.image || event.imageUrl) ? (
            <Image source={{ uri: event.image ?? event.imageUrl }} style={styles.image} resizeMode="cover" />
          ) : (
            <LinearGradient colors={[color, `${color}CC`]} style={styles.imageGradient}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>{t(`event.types.${event.type}`, event.type)}</Text>
            </LinearGradient>
          )}

          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeText}>{t(`event.types.${event.type}`, displayType)}</Text>
          </View>
        </View>

        {/* Right: Gradient content */}
        <LinearGradient colors={[color, `${color}CC`]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.content}>
          <Text numberOfLines={3} style={styles.titleRight}>{displayTitle || event.title}</Text>

          <View>
            <View style={styles.metaRow}>
              <Text style={{ color: '#FFF', fontSize: 14, marginRight: 6 }}>📅</Text>
              <Text style={styles.metaText}>{formattedDate}{formattedTime ? ` • ${formattedTime}` : ""}</Text>
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={[styles.fullBtn, { backgroundColor: lightTheme.colors["accent-blue"] }]} onPress={onViewDetails}>
                <Text style={styles.smallBtnText}>Ver detalles</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.fullBtn, active ? styles.activeBtn : styles.inactiveBtn]} onPress={onToggleActive}>
                <Text style={styles.smallBtnText}>{active ? "Activo" : "Inactivo"}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.fullBtn, { backgroundColor: color }]} onPress={() => setTypeModalVisible(true)}>
                <Text style={styles.smallBtnText}>{displayType}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
      </View>

      {/* Type selection modal */}
      <Modal visible={typeModalVisible} transparent animationType="fade" onRequestClose={() => setTypeModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Seleccionar tipo</Text>
            <ScrollView>
              {[
                "Congreso",
                "Concurso",
                "Charla",
                "Conferencia",
              ].map((tpe) => (
                <Pressable
                  key={tpe}
                  style={[styles.modalOption, tpe === event.type ? styles.modalOptionActive : undefined]}
                  onPress={() => {
                    setTypeModalVisible(false);
                    if (tpe !== event.type) {
                      if (typeof onChangeType === "function") onChangeType(tpe);
                    }
                  }}
                >
                  <Text style={styles.modalOptionText}>{tpe}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable style={styles.modalClose} onPress={() => setTypeModalVisible(false)}>
              <Text style={styles.modalCloseText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
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
    width: 340,
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
    minHeight: 120,
    height: 120,
    alignSelf: "stretch",
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
    padding: 10,
    justifyContent: "space-between",
    minHeight: 120,
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
  buttonsContainer: { marginTop: 6, flexDirection: "row", width: "100%", justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' },
  fullBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, marginVertical: 4, marginHorizontal: 4, minWidth: 80, alignItems: "center" },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: { width: '100%', maxWidth: 480, backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden' },
  modalTitle: { fontWeight: '700', fontSize: 16, padding: 14, backgroundColor: '#fff' },
  modalOption: { paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: '#eee' },
  modalOptionActive: { backgroundColor: '#f0f6ff' },
  modalOptionText: { fontSize: 14, color: '#222' },
  modalClose: { padding: 12, alignItems: 'center', backgroundColor: '#fff' },
  modalCloseText: { color: '#2b2b2b', fontWeight: '700' },
});
