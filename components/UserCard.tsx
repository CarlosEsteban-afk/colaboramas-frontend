import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  name: string;
  title: string;
  location: string;
  tags: string[];
};

export default function UserCard({ name, title, location, tags }: Props) {
  return (
    <View style={styles.card}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "linear-gradient(90deg, #8A2BE2, #E94057)",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: "#E94057",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  title: {
    fontSize: 14,
    color: "#fff",
    marginTop: 4,
  },
  location: {
    fontSize: 12,
    color: "#f5f5f5",
    marginTop: 2,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 6,
  },
  tag: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  tagText: {
    color: "#fff",
    fontSize: 12,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
