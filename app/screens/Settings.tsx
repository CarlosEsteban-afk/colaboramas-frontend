import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Monicon } from "@monicon/native";
import { lightTheme } from "../../theme";

export default function Settings({ navigation }: any) {
  const insets = useSafeAreaInsets();

  const configs = [
    { label: "Idioma", value: "Español", icon: "mdi:translate" },
    { label: "Políticas", value: "Políticas de servicio", icon: "mdi:shield-outline" },
    { label: "Notificaciones", value: "Activadas", icon: "mdi:bell-outline" },
    { label: "Seguridad", value: "Alta", icon: "mdi:lock-outline" },
  ];

  return (
    <SafeAreaView
      className="flex-1 bg-color-light-base-muted-foreground p-4"
      style={{ paddingTop: insets.top + 16 }}
    >
      {/* Botón de volver */}
      <TouchableOpacity
        className="mb-4 flex-row items-center"
        activeOpacity={0.7}
        onPress={() => navigation?.goBack()}
      >
        <Monicon
          name="mdi:arrow-left"
          size={24}
          color={lightTheme.colors["primary-purple"]}
        />
        <Text className="ml-2 text-base font-semibold text-primary-purple">Volver</Text>
      </TouchableOpacity>

      {/* Título */}
      <Text className="text-xl font-bold text-center mb-4">Configuración</Text>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white rounded-lg overflow-hidden shadow-sm flex-1">
          {configs.map((conf, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                className="flex-row items-center p-4"
                activeOpacity={0.7}
                onPress={() => console.log(`${conf.label} pressed`)}
              >
                <Monicon
                  name={conf.icon}
                  size={24}
                  color={lightTheme.colors["primary-purple"]}
                />

                <View className="flex-1 ml-3">
                  <Text className="text-base font-semibold">{conf.label}</Text>
                  {conf.value ? (
                    <Text className="text-sm text-gray-500">{conf.value}</Text>
                  ) : null}
                </View>
              </TouchableOpacity>

              {index < configs.length - 1 && (
                <View className="h-[1px] bg-gray-200 mx-4" />
              )}
            </React.Fragment>
          ))}

          {/* Botón rojo de eliminar cuenta */}
          <TouchableOpacity
            className="p-4 items-center"
            activeOpacity={0.7}
            onPress={() => console.log("Eliminar cuenta pressed")}
          >
            <Text className="text-red-600 font-semibold text-base">Eliminar cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
