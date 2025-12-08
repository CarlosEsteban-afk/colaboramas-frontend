import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Select from "../components/AuthSelect";
import { useProfileEdit } from "../../src/hooks/useProfileEdit";

export default function ProfileEditView() {
  const {
    formData,
    handleChange,
    pickImage,
    handleSubmit,
    fields,
    countries,
    filteredCities,
  } = useProfileEdit();

  return (
    <LinearGradient colors={["#ec4899", "#8b5cf6"]} className="flex-1">
      {/* HEADER */}
      <View className="px-6 pt-12 pb-3">
        <Text className="text-white text-2xl font-semibold text-center mb-1">
          Completa tu perfil
        </Text>
        <Text className="text-purple-100 text-center">
          Esta información será visible en tu perfil.
        </Text>
      </View>
      {/* FORMULARIO */}
      <View className="mx-5 mb-5 bg-white/20 rounded-2xl p-4 flex-1">
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS === "web" ? 120 : 40,
          }}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
          {...(Platform.OS === "web" && {
            style: { flex: 1 },
            contentContainerStyle: {
              minHeight: "100%",
              paddingBottom: 120,
            },
          })}
        >
          <View className={Platform.OS === "web" ? "pb-4" : ""}>
            {/* FOTO */}
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
                  <Text className="text-white text-center">Subir imagen</Text>
                )}
              </TouchableOpacity>
              <Text className="text-white mt-2 underline">Cambir foto</Text>
            </View>
            {/* PAIS */}
            <Select
              label="País"
              options={countries.map((country) => country.value)}
              value={formData.pais}
              onSelect={(val) => {
                handleChange("pais", val.trim());
              }}
            />
            {/* CIUDAD */}
            <Select
              label="Ciudad"
              options={filteredCities}
              value={formData.ciudad}
              onSelect={(val) => handleChange("ciudad", val)}
            />

            {/* CAMPOS DINÁMICOS */}
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
            <View className="flex-row items-center mt-4 mb-4">
              <Switch
                value={formData.aceptaTerminos}
                onValueChange={(val) => handleChange("aceptaTerminos", val)}
              />
              <Text className="text-white ml-3">
                He leído y acepto los{" "}
                <Text className="text-pink-300 underline">términos</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
        <View className="mt-3">
          <View className="flex-row gap-3">
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
            <Text className="text-white text-center mt-3 underline">
              Omitir
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
