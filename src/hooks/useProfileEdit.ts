import { useRef, useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
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
      handleChange("profileImage", result.assets[0].uri);
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
