import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../../theme";
import { useUser } from "../../../src/hooks/useUser";
import { useLogout } from "../../../src/hooks/useLogOut";
import { useUpdateUser } from "../../../src/hooks/useUpdateUser";

export default function ProfileScreen() {
  const { user, refreshUser } = useUser();
  const { handleLogout } = useLogout();
  const { updateUser, uploadProfileImage } = useUpdateUser();

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    username: user?.username || "",
    motivaciones: user?.motivaciones || "",
    actividadesPersonales: user?.actividadesPersonales || "",
    proyectosRecientes: user?.proyectosRecientes || "",
    ciudad: user?.ciudad || "",
    pais: user?.pais || "",
    imageUrl: user?.imageUrl || "",
  });

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-xl text-primary-purple font-semibold">
          Cargando usuario...
        </Text>
      </View>
    );
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: false,
    });

    if (!result.canceled) {
      try {
        const newUrl = await uploadProfileImage(result.assets[0]);
        setForm((prev) => ({ ...prev, imageUrl: newUrl }));
        await refreshUser();
      } catch (e) {
        Alert.alert("Error", "No se pudo subir la imagen.");
      }
    }
  };

  const handleSave = async () => {
    try {
      await updateUser({
        username: form.username,
        motivaciones: form.motivaciones,
        actividadesPersonales: form.actividadesPersonales,
        proyectosRecientes: form.proyectosRecientes,
        ciudad: form.ciudad,
        pais: form.pais,
      });

      await refreshUser();
      setIsEditing(false);

      Alert.alert("Éxito", "Perfil actualizado correctamente.");
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el perfil.");
    }
  };

  const infoItems = [
    { label: "Nombre de perfil", field: "username" },
    { label: "Motivaciones", field: "motivaciones" },
    { label: "Intereses personales", field: "actividadesPersonales" },
    { label: "Proyectos", field: "proyectosRecientes" },
    { label: "Ciudad", field: "ciudad" },
    { label: "País", field: "pais" },
  ];

  return (
    <View className="flex-1 bg-white mb-16">
      <Text
        className="text-2xl text-primary-purple font-semibold text-center pt-5"
        style={{ color: lightTheme.colors["primary-purple"] }}
      >
        Perfil
      </Text>

      <TouchableOpacity
        className="self-end mr-5 mb-2 bg-primary-purple px-4 py-2 rounded-xl"
        onPress={() => setIsEditing(true)}
      >
        <Text className="text-black font-semibold">Editar Perfil</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* IMAGEN */}
        <TouchableOpacity
          onPress={isEditing ? pickImage : undefined}
          className="self-center mb-4"
        >
          <Image
            source={{
              uri: form.imageUrl || "https://i.ibb.co/Y3N0wbh/default-avatar.png",
            }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              borderWidth: 2,
              borderColor: lightTheme.colors["primary-purple"],
            }}
          />
          {isEditing && (
            <Text className="text-center text-primary-purple">
              Cambiar imagen
            </Text>
          )}
        </TouchableOpacity>

        {/* CAMPOS */}
        {infoItems.map((item) => (
          <View key={item.label}>
            <GradientLabel text={item.label} />
            <View className="mx-4 my-2">
            {isEditing ? (
              <TextInput
                multiline
                value={form[item.field]}
                onChangeText={(text) =>
                  setForm((prev) => ({ ...prev, [item.field]: text }))
                }
                className="border border-gray-300 rounded-lg p-2 text-base text-dark-gray"
              />
            ) : (
              <Text className="text-dark-gray text-base ml-2">
                {form[item.field] || "No especificado"}
              </Text>
            )}
            </View>
          </View>
        ))}

        {isEditing && (
          <View className="flex-row justify-center gap-5 mt-2">
            <TouchableOpacity
              className="rounded-md px-3 pb-1"
              onPress={handleSave}
              style={{backgroundColor: lightTheme.colors["primary-purple"],}}
            >
              <Text className="text-white font-semibold text-lg">Guardar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="border-2 rounded-md px-3"
              onPress={() => setIsEditing(false)}
              style= {{borderColor: lightTheme.colors["primary-purple"],}}
            >
              <Text className="font-semibold text-lg" style={{color: lightTheme.colors["primary-purple"],}}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function GradientLabel({ text }: { text: string }) {
  return (
    <LinearGradient
      colors={[
        lightTheme.colors["purple-light"],
        lightTheme.colors["pink-light"],
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="self-start rounded-r-xl px-5 py-1"
    >
      <Text className="text-white">{text}</Text>
    </LinearGradient>
  );
}
