// UserCard.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../theme";
import { useTranslation } from "react-i18next";
import SendMessageModal from "./SendMessageModal";

type Props = {
  id: number;
  name: string;
  title: string;
  location: string;
  tags?: string[];
  imageUrl?: string;
  onContactPress: (id: number, name: string) => void; // 👈 NUEVO
};

export default function UserCard({
  id,
  name,
  title,
  location,
  tags = [],
  imageUrl,
  onContactPress,
}: Props) {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <LinearGradient
      colors={[
        lightTheme.colors["primary-pink"],
        lightTheme.colors["primary-purple"],
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.header}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]} />
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>

      {tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {tags.map((tag, i) => (
            <View key={i} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}

      {/* 👉 SOLO abre el modal, no envia, no valida auth */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>{t("user.contact")}</Text>
      </TouchableOpacity>


      <SendMessageModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        recipientId={id}
        recipientName={name}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 10,
    width: "100%",
    maxWidth: 375,
    marginVertical: 6,
    marginHorizontal: 4,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#ddd",
    marginRight: 12,
  },
  imagePlaceholder: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: lightTheme.colors.background,
  },
  title: {
    fontSize: 14,
    color: lightTheme.colors.background,
    marginTop: 2,
  },
  location: {
    fontSize: 12,
    color: lightTheme.colors["muted-foreground"],
    marginTop: 2,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 6,
  },
  tag: {
    backgroundColor: lightTheme.colors.orange,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  tagText: { color: lightTheme.colors.background, fontSize: 12 },
  button: {
    backgroundColor: lightTheme.colors["accent-blue"],
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginTop: 10,
    alignSelf: "flex-end",
  },
  buttonText: { color: lightTheme.colors.background, fontWeight: "600" },
});
