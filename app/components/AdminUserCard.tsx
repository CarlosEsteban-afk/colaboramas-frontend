import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../theme";

type Props = {
  name: string;
  title?: string;
  location?: string;
  tags?: string[];
  imageUrl?: string;
  onContact?: () => void;
  role?: "comunicador" | "investigador" | string;
  banned?: boolean;
  onToggleRole?: () => void;
  onToggleBan?: () => void;
  onViewDetails?: () => void;
};

export default function AdminUserCard({ name, title, location, tags = [], imageUrl, onContact, role = "investigador", banned = false, onToggleRole, onToggleBan, onViewDetails, }: Props) {
  return (
    <LinearGradient
      colors={[lightTheme.colors["primary-pink"], lightTheme.colors["primary-purple"]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.topCol}>
        <View style={styles.topRow}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.avatarLarge} />
          ) : (
            <View style={styles.avatarPlaceholderLarge} />
          )}

          <Text style={styles.name}>{name}</Text>
        </View>

        <View style={styles.subInfo}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {location ? <Text style={styles.location}>{location}</Text> : null}
        </View>

        {tags.length > 0 && (
          <View style={styles.tagsRow}>
            {tags.map((t, i) => (
              <View key={i} style={styles.tag}>
                <Text style={styles.tagText}>{t}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      <View style={styles.adminButtons}>
        <View style={styles.leftGroup}>
          <TouchableOpacity
            style={[
              styles.adminBtn,
              styles.roleWide,
              role === "comunicador" ? styles.roleBtnCommunicator : styles.roleBtnInvestigator,
            ]}
            onPress={onToggleRole}
            accessibilityLabel={`Toggle role for ${name}`}
          >
            <Text style={styles.adminBtnText}>{role === "comunicador" ? "Comunicador" : "Investigador"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.adminBtn, styles.detailsBtn]} onPress={onViewDetails} accessibilityLabel={`View details for ${name}`}>
            <Text style={styles.adminBtnText}>Detalles</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.banBtn, banned ? styles.bannedBtnOn : styles.bannedBtnOff]}
          onPress={onToggleBan}
          accessibilityLabel={`${banned ? "Set active" : "Set inactive"} ${name}`}
        >
          <Text style={styles.adminBtnText}>{banned ? "Inactivo" : "Activo"}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: lightTheme.colors.background,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: lightTheme.colors["muted-foreground"],
  },

  avatarLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: lightTheme.colors.background,
    marginBottom: 10,
  },
  avatarPlaceholderLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: lightTheme.colors["muted-foreground"],
    marginBottom: 10,
  },

  topCol: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  subInfo: {
    marginTop: 6,
  },
  info: {
    flex: 1,
  },
  name: {
    color: lightTheme.colors.background,
    fontWeight: "800",
    fontSize: 18,
    marginLeft: 8,
  },
  title: {
    color: lightTheme.colors.background,
    marginTop: 6,
    fontSize: 13,
    opacity: 0.95,
  },
  location: {
    color: lightTheme.colors["muted-foreground"],
    marginTop: 4,
    fontSize: 12,
    opacity: 0.95,
  },
  tagsRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 8,
  },
  tag: {
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: lightTheme.colors["orange"],
    marginRight: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  tagText: {
    color: lightTheme.colors.background,
    fontSize: 12,
  },
  
  card: {
    borderRadius: 12,
    padding: 18,
    marginTop: 12,
    width: "100%",
    alignSelf: "stretch",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  innerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  centerCol: {
    flex: 1,
    marginLeft: 10,
  },
  headerCol: {
    marginBottom: 6,
  },
  rightCol: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  // buttons area placed at the bottom of the card
  adminButtons: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  adminBtn: {
    flexBasis: "30%",
    flexGrow: 0,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginHorizontal: 6,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  roleWide: {
    flexBasis: "45%",
  },
  adminBtnText: {
    color: lightTheme.colors.background,
    fontWeight: "700",
    fontSize: 12,
  },
  roleBtnInvestigator: {
    backgroundColor: lightTheme.colors["orange"],
  },
  roleBtnCommunicator: {
    backgroundColor: lightTheme.colors["green"],
  },
  // ban button moved to the right; color toggles depending on banned state
  banBtn: {
    width: 72,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 5,
  },
  bannedBtnOn: {
    backgroundColor: "#e74c3c",
  },
  bannedBtnOff: {
    backgroundColor: "#4CAF50",
  },
  detailsBtn: {
    backgroundColor: lightTheme.colors["accent-blue"],
  },
  leftGroup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
