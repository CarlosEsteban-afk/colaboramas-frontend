import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useCompleteProfile } from "../../src/hooks/useCompleteProfile";
import { useUser } from "../../src/hooks/useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function ProfileEditView() {
  const { completeProfile } = useCompleteProfile();
  const { user, setUser } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    profileImage: "",
    educacion: "",
    pais: "",
    ciudad: "",
    investigacion: "",
    formacion: "",
    intereses: "",
    motivaciones: "",
    actividades: "",
    proyectos: "",
    aceptaTerminos: false,
  });
  const getHomeRouteByRole = (roles: string[]) => {
    if (!roles) return "/auth/login";

    if (roles.includes("ACADEMICO")) return "/academico/screens";
    if (roles.includes("COMUNICADOR")) return "/comunicador/screens";

    return "/auth/login";
  };

  const handleChange = (name: string, value: string | boolean) => {
    setFormData({ ...formData, [name]: value });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permiso requerido", "Debes permitir acceso a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [1, 1],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setFormData({ ...formData, profileImage: result.assets[0].uri });
    }
  };
  const handleSubmit = async () => {
    if (!formData.aceptaTerminos) {
      Alert.alert("Atención", "Debes aceptar los términos y condiciones.");
      return;
    }

    try {
      const updatedUser = await completeProfile(user.id, formData);
      setUser(updatedUser);
      await AsyncStorage.setItem("auth_user", JSON.stringify(updatedUser));

      const homeRoute = getHomeRouteByRole(updatedUser.roles);
      router.replace(homeRoute);

      Alert.alert("Éxito", "Perfil guardado correctamente.");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "No se pudo guardar el perfil.");
    }
  };

  const fields = [
    {
      label: "Educación",
      name: "educacion",
      placeholder: "Ej: Universidad XYZ",
    },
    { label: "País", name: "pais", placeholder: "Selecciona tu país" },
    { label: "Ciudad", name: "ciudad", placeholder: "Selecciona tu ciudad" },
    {
      label: "Campos de investigación",
      name: "investigacion",
      placeholder: "¿Qué has investigado?",
    },
    {
      label: "Formación",
      name: "formacion",
      placeholder: "Nivel de formación",
    },
    {
      label: "Líneas de interés",
      name: "intereses",
      placeholder: "¿Qué te gustaría investigar?",
    },
    {
      label: "Motivaciones",
      name: "motivaciones",
      placeholder: "¿Qué te motiva?",
    },
    {
      label: "Actividades personales",
      name: "actividades",
      placeholder: "¿Qué te gusta hacer?",
    },
    {
      label: "Proyectos recientes",
      name: "proyectos",
      placeholder: "Menciona algunos proyectos",
    },
  ];

  return (
    <LinearGradient colors={["#ec4899", "#8b5cf6"]} className="flex-1">
      <View className="px-6 pt-12 pb-3">
        <Text className="text-white text-2xl font-semibold text-center mb-1">
          Completa tu perfil
        </Text>
        <Text className="text-purple-100 text-center">
          Esta información será visible en tu perfil. Puedes completarla más
          tarde.
        </Text>
      </View>

      <View className="flex-1 mx-5 mb-5 bg-white/20 rounded-2xl p-4 max-h-full">
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <View className="items-center mb-5">
            <TouchableOpacity
              className="w-28 h-28 rounded-full bg-white/30 items-center justify-center overflow-hidden"
              onPress={pickImage}
            >
              {formData.profileImage ? (
                <Image
                  source={{ uri: formData.profileImage }}
                  className="w-full h-full"
                />
              ) : (
                <Text className="text-white text-center px-2">
                  Subir imagen
                </Text>
              )}
            </TouchableOpacity>

            <Text className="text-white mt-2 underline">Cambiar foto</Text>
          </View>

          {fields.map((field) => (
            <View key={field.name} className="mb-4">
              <Text className="text-white mb-1">{field.label}</Text>
              <TextInput
                className="bg-white rounded-lg px-3 py-2 text-gray-800"
                placeholder={field.placeholder}
                placeholderTextColor="#aaa"
                value={(formData as any)[field.name]}
                onChangeText={(text) => handleChange(field.name, text)}
              />
            </View>
          ))}

          {/* Switch */}
          <View className="flex-row items-center mt-4">
            <Switch
              value={formData.aceptaTerminos}
              onValueChange={(val) => handleChange("aceptaTerminos", val)}
            />
            <Text className="text-white ml-3">
              He leído y acepto los{" "}
              <Text className="text-pink-300 underline">
                términos y condiciones
              </Text>
              .
            </Text>
          </View>
        </ScrollView>

        <View className="flex-row gap-3 mt-3">
          <TouchableOpacity className="flex-1 border border-white py-3 rounded-lg items-center">
            <Text className="text-white">Volver</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 bg-white py-3 rounded-lg items-center"
            onPress={handleSubmit}
          >
            <Text className="text-purple-700 font-bold">Registrar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text className="text-white text-center mt-3 underline">Omitir</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
