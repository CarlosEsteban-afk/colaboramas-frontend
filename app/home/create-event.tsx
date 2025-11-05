import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from "react-native";
import { lightTheme } from "../../theme";
import { useRouter } from "expo-router";

export default function CreateEventScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const onSave = () => {
    // Integrar con backend aquí
    const newEvent = { title, date, place, type, description };
    console.log("Nuevo evento:", newEvent);
    Alert.alert("Evento creado", "El evento fue creado (simulado).");
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear nuevo evento</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Nombre del evento" />

      <Text style={styles.label}>Fecha / Hora</Text>
      <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="e.g. 24 Oct 2025, 09:00" />

      <Text style={styles.label}>Lugar</Text>
      <TextInput style={styles.input} value={place} onChangeText={setPlace} placeholder="Lugar del evento" />

      <Text style={styles.label}>Tipo</Text>
      <TextInput style={styles.input} value={type} onChangeText={setType} placeholder="Concurso / Congreso / Conferencia" />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Descripción breve del evento"
        multiline
        numberOfLines={4}
      />

      <View style={styles.button}>
        <Button title="Guardar evento" onPress={onSave} color={lightTheme.colors["primary-purple"]} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: lightTheme.colors["primary-purple"],
    marginBottom: 16,
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
    color: lightTheme.colors["dark-gray"],
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FAFAFA",
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 20,
  },
});