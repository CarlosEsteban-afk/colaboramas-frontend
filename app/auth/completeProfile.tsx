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
  KeyboardAvoidingView,
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
    <LinearGradient colors={["#ec4899", "#8b5cf6"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <View className="px-6 pt-12 pb-3">
          <Text className="text-white text-2xl font-semibold text-center mb-1">
            Completa tu perfil
          </Text>
          <Text className="text-purple-100 text-center">
            Esta información será visible en tu perfil.
          </Text>
        </View>

        <View className="mx-5 mb-5 bg-white/20 rounded-2xl p-4 flex-1">
          <ScrollView
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 250, //espacio para teclado
            }}
          >
            <View>
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
                <Text className="text-white mt-2 underline">Cambiar foto</Text>
              </View>

              <Select
                label="País"
                options={countries.map((c) => c.value)}
                value={formData.pais}
                onSelect={(val) => handleChange("pais", val.trim())}
              />

              <Select
                label="Ciudad"
                options={filteredCities}
                value={formData.ciudad}
                onSelect={(val) => handleChange("ciudad", val)}
              />

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
                  onValueChange={(v) => handleChange("aceptaTerminos", v)}
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
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
