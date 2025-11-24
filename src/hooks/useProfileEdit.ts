import { useRef, useState } from "react";
import { Alert, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

import { useCompleteProfile } from "./useCompleteProfile";
import { useUser } from "./useUser";
import countries from "../data/countries.json";

export const useProfileEdit = () => {
  const { completeProfile } = useCompleteProfile();
  const { user, setUser } = useUser();
  const router = useRouter();
  const cityCache = useRef({});

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

  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const handleChange = (name: string, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      if (name === "pais") {
        if (value) {
          if (cityCache.current[value]) {
            setFilteredCities(cityCache.current[value]);
          } else {
            const cities = countries[value] || [];
            cityCache.current[value] = cities;
            setFilteredCities(cities);
          }
        } else {
          setFilteredCities([]);
        }

        return { ...newData, ciudad: "" };
      }

      return newData;
    });
  };

  const pickImage = async () => {
    // expo-image-picker is not available on web builds by default. Dynamically
    // import it only on native platforms so web bundling doesn't fail during
    // development. On web we show a friendly message.
    if (Platform.OS === "web") {
      Alert.alert("No disponible en web", "La selección de imagen solo está disponible en la app móvil durante desarrollo.");
      return;
    }

    try {
      const ImagePicker = await import("expo-image-picker");
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso requerido", "Debes permitir acceso a la galería.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images || ["images"],
        aspect: [1, 1],
        allowsEditing: true,
        quality: 0.8,
      });

      // result.canceled (new) or result.cancelled (older) handling
      const canceled = (result as any).canceled ?? (result as any).cancelled ?? false;
      const assets = (result as any).assets ?? (result as any).selected ?? null;

      if (!canceled && assets && assets.length > 0) {
        handleChange("profileImage", assets[0].uri);
      }
    } catch (err) {
      console.warn("expo-image-picker not available:", err);
      Alert.alert("Error", "No se pudo abrir el selector de imágenes.");
    }
  };

  const getHomeRouteByRole = (roles: string[]) => {
    if (!roles) return "/auth/login";
    if (roles.includes("ACADEMICO")) return "/academico/screens";
    if (roles.includes("COMUNICADOR")) return "/comunicador/screens";
    return "/auth/login";
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

      router.replace(getHomeRouteByRole(updatedUser.roles));
      Alert.alert("Éxito", "Perfil guardado correctamente.");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "No se pudo guardar el perfil.");
    }
  };

  // Convertir countries object a array para el Picker
  const countryOptions = Object.keys(countries).map((country) => ({
    label: country,
    value: country,
  }));

  const fields = [
    {
      label: "Educación",
      name: "educacion",
      placeholder: "Ej: Universidad XYZ",
    },
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

  return {
    formData,
    setFormData,
    handleChange,
    pickImage,
    handleSubmit,
    fields,
    countries: countryOptions,
    filteredCities,
  };
};
