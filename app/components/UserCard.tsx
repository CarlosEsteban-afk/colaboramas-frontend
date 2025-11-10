import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../theme";
import { useTranslation } from "react-i18next";

type Props = {
  name: string;
  title: string;
  location: string;
  tags: string[];
  imageUrl?: string; 
};

export default function UserCard({ name, title, location, tags = [], imageUrl }: Props) {
  const { t } = useTranslation();

  return (
    <LinearGradient
      colors={[lightTheme.colors["primary-pink"], lightTheme.colors["primary-purple"]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.headerRow}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>

      {Array.isArray(tags) && tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{t("user.contact")}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 16,
    maxWidth: 300,
    alignSelf: "center",
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: lightTheme.colors.background,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: lightTheme.colors["muted-foreground"],
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
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
    backgroundColor: lightTheme.colors["orange"],
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  tagText: {
    color: lightTheme.colors.background,
    fontSize: 12,
  },
  button: {
    backgroundColor: lightTheme.colors["accent-blue"],
    width: 80,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 12,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  buttonText: {
    color: lightTheme.colors.background,
    fontWeight: "600",
  },
});
