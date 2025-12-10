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
import { useTranslation } from "react-i18next";

export default function ProfileScreen() {
  const { t } = useTranslation();
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
          {t("profile.loadingUser")}
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
        Alert.alert(t("profile.error"), t("profile.imageUploadError"));
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

      Alert.alert(t("profile.success"), t("profile.updated"));
    } catch (error) {
      Alert.alert(t("profile.error"), t("profile.updateError"));
    }
  };

  const infoItems = [
    { label: t("profile.fields.username"), field: "username" },
    { label: t("profile.fields.motivaciones"), field: "motivaciones" },
    { label: t("profile.fields.actividades"), field: "actividadesPersonales" },
    { label: t("profile.fields.proyectos"), field: "proyectosRecientes" },
    { label: t("profile.fields.ciudad"), field: "ciudad" },
    { label: t("profile.fields.pais"), field: "pais" },
  ];

  return (
    <View className="flex-1 bg-white mb-16">
      <Text
        className="text-2xl font-semibold text-center pt-5"
        style={{color: lightTheme.colors["primary-purple"]}}
      >
        {t("profile.title")}
      </Text>

      <TouchableOpacity
        className="self-end mr-5 mb-2 bg-primary-purple px-4 py-2 rounded-xl"
        onPress={() => setIsEditing(true)}
      >
        <Text className="text-black font-semibold">
          {t("profile.edit")}
        </Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

        {/* FOTO */}
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
              {t("profile.changeImage")}
            </Text>
          )}
        </TouchableOpacity>

        {/* CAMPOS */}
        {infoItems.map((item) => (
          <View key={item.field}>
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
                  {form[item.field] || t("profile.notSpecified")}
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
              style={{ backgroundColor: lightTheme.colors["primary-purple"] }}
            >
              <Text className="text-white font-semibold text-lg">
                {t("profile.save")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="border-2 rounded-md px-3"
              onPress={() => setIsEditing(false)}
              style={{ borderColor: lightTheme.colors["primary-purple"] }}
            >
              <Text
                className="font-semibold text-lg"
                style={{ color: lightTheme.colors["primary-purple"] }}
              >
                {t("profile.cancel")}
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
