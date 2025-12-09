import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
  Platform,
} from "react-native";
import Select from "../components/AuthSelect";
import MultiSelectDropdown from "../components/MultiSelectDropdown";
import { useProfileEdit } from "../../src/hooks/useProfileEdit";
import AuthLayout from "../layouts/authLayout";
import { useRouter } from "expo-router";
import { Monicon } from "@monicon/native";

export default function ProfileEditView() {
  const router = useRouter();

  const {
    formData,
    handleChange,
    pickImage,
    handleSubmit,
    countries,
    filteredCities,
    researchFieldsList,
    interestsList,
    addEducationEntry,
    removeEducationEntry,
    updateEducationEntry,
  } = useProfileEdit();

  return (
    <AuthLayout title="Crear Cuenta" card cardGradient showLogo={false}>
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
          <Text className="text-white mt-2 underline">Cambiar foto</Text>
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

        {/* CAMPOS DE INVESTIGACIÓN */}
        <MultiSelectDropdown
          label="Campos de Investigación"
          options={researchFieldsList}
          selected={formData.camposInvestigacion}
          setSelected={(values) => handleChange("camposInvestigacion", values)}
        />

        {/* LÍNEAS DE INTERÉS */}
        <MultiSelectDropdown
          label="Líneas de Interés"
          options={interestsList}
          selected={formData.lineasInteres}
          setSelected={(values) => handleChange("lineasInteres", values)}
        />

        {/* EDUCACIÓN - HISTORIAL */}
        <View className="mb-4">
          <Text className="text-white mb-2 font-semibold">Historial Educativo</Text>
          {formData.historialEducativo.map((edu, index) => (
            <View key={index} className="mb-3 p-3 bg-white/10 rounded-lg">
              <TextInput
                className="bg-white rounded-lg px-3 py-2 text-gray-800 mb-2"
                placeholder="Institución"
                placeholderTextColor="#aaa"
                value={edu.institucion}
                onChangeText={(text) =>
                  updateEducationEntry(index, "institucion", text)
                }
              />
              <TextInput
                className="bg-white rounded-lg px-3 py-2 text-gray-800 mb-2"
                placeholder="Título / Grado"
                placeholderTextColor="#aaa"
                value={edu.titulo}
                onChangeText={(text) => updateEducationEntry(index, "titulo", text)}
              />
              {formData.historialEducativo.length > 1 && (
                <TouchableOpacity
                  className="flex-row items-center justify-center py-2"
                  onPress={() => removeEducationEntry(index)}
                >
                  <Monicon name="mdi:trash-can" size={18} color="#ff6b6b" />
                  <Text className="text-red-400 ml-1">Eliminar</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
          <TouchableOpacity
            className="flex-row items-center justify-center py-2 border border-white/50 rounded-lg"
            onPress={addEducationEntry}
          >
            <Monicon name="mdi:plus" size={18} color="white" />
            <Text className="text-white ml-1">Agregar Educación</Text>
          </TouchableOpacity>
        </View>

        {/* MOTIVACIONES */}
        <View className="mb-4">
          <Text className="text-white mb-1">Motivaciones</Text>
          <TextInput
            className="bg-white rounded-lg px-3 py-2 text-gray-800"
            placeholder="¿Qué te motiva?"
            placeholderTextColor="#aaa"
            value={formData.motivaciones}
            onChangeText={(text) => handleChange("motivaciones", text)}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* ACTIVIDADES PERSONALES */}
        <View className="mb-4">
          <Text className="text-white mb-1">Actividades Personales</Text>
          <TextInput
            className="bg-white rounded-lg px-3 py-2 text-gray-800"
            placeholder="¿Qué te gusta hacer?"
            placeholderTextColor="#aaa"
            value={formData.actividadesPersonales}
            onChangeText={(text) => handleChange("actividadesPersonales", text)}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* PROYECTOS RECIENTES */}
        <View className="mb-4">
          <Text className="text-white mb-1">Proyectos Recientes</Text>
          <TextInput
            className="bg-white rounded-lg px-3 py-2 text-gray-800"
            placeholder="Menciona algunos proyectos"
            placeholderTextColor="#aaa"
            value={formData.proyectosRecientes}
            onChangeText={(text) => handleChange("proyectosRecientes", text)}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* TÉRMINOS Y CONDICIONES */}
        <View className="flex-row items-center mt-4 mb-4">
          <Switch
            value={formData.aceptaTerminos}
            onValueChange={(val) => handleChange("aceptaTerminos", val)}
          />
          <Text className="text-white ml-3">
            He leído y acepto los{" "}
            <Text className="text-pink-300 underline">términos y condiciones</Text>
          </Text>
        </View>
      </View>

      {/* BOTONES */}
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
        <Text className="text-white text-center mt-3 underline">Omitir</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text className="text-center text-blue-300 underline text-sm mt-2">
          ¿Ya tienes cuenta? Inicia sesión
        </Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}
