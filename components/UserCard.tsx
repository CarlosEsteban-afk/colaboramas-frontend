import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../theme"; 

type Props = {
  name: string;
  title: string;
  location: string;
  tags: string[];
};

export default function UserCard({ name, title, location, tags }: Props) {
  return (
    <LinearGradient
      colors={[lightTheme.colors["primary-pink"], lightTheme.colors["primary-purple"]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.location}>{location}</Text>

      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Contactar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: lightTheme.colors.background, // blanco sobre gradiente
  },
  title: {
    fontSize: 14,
    color: lightTheme.colors.background,
    marginTop: 4,
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
    backgroundColor: "rgba(255,255,255,0.2)", // puedes crear un color desde el tema si quieres
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
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  buttonText: {
    color: lightTheme.colors.background,
    fontWeight: "600",
  },
});