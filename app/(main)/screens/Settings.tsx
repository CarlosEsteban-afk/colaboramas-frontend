import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
} from "react-native";
import { Monicon } from "@monicon/native";
import { lightTheme } from "../../../theme";
import { useRouter } from "expo-router";
import useSettings from "../../../src/hooks/useSettings";

export default function Settings() {
  const router = useRouter();

  const {
    t,
    configs,
    modalVisible,
    modalConfig,
    fadeAnim,
    openModal,
    closeModal,
  } = useSettings();

  return (
    <View className="flex-1 bg-color-light-base-muted-foreground p-4">
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => router.back()}
        >
          <Monicon
            name="mdi:arrow-left"
            size={24}
            color={lightTheme.colors["primary-purple"]}
          />
          <Text
            className="ml-2  font-semibold"
            style={{ color: lightTheme.colors["primary-purple"] }}
          >
            {t("settings.back")}
          </Text>
        </TouchableOpacity>

        <Text
          className="text-2xl font-bold text-center"
          style={{ color: lightTheme.colors["primary-purple"] }}
        >
          {t("settings.title")}
        </Text>

        <View style={{ width: 50 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="bg-white rounded-lg overflow-hidden shadow-sm">
          {configs.map((conf, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                className="flex-row items-center p-4"
                onPress={conf.onPress || (() => {})}
              >
                <Monicon
                  name={conf.icon}
                  size={24}
                  color={lightTheme.colors["primary-purple"]}
                />
                <View className="flex-1 ml-3">
                  <Text className="text-base font-semibold">{conf.label}</Text>
                  {conf.value && (
                    <Text className="text-sm text-gray-500">{conf.value}</Text>
                  )}
                </View>
              </TouchableOpacity>

              {index < configs.length - 1 && (
                <View className="h-[1px] bg-gray-200 mx-4" />
              )}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>

      <View className="absolute bottom-4 left-4 right-4">
        <TouchableOpacity
          className="p-6 bg-white rounded-lg items-center shadow-sm"
          onPress={() =>
            openModal({
              title: "Eliminar cuenta",
              message:
                "Esta acción es permanente y no se puede deshacer. ¿Deseas continuar?",
              confirmText: "Eliminar",
              onConfirm: () => console.log("Eliminar cuenta confirmada"),
            })
          }
        >
          <Text className="text-red-600 font-semibold text-base">
            {t("settings.deleteAccount")}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal transparent visible={modalVisible} animationType="none">
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.45)",
            justifyContent: "center",
            alignItems: "center",
            opacity: fadeAnim,
          }}
        >
          <View className="w-80 bg-white rounded-2xl p-6 shadow-xl">
            <Text className="text-lg font-bold text-center mb-2">
              {modalConfig.title}
            </Text>

            <Text className="text-gray-600 text-center mb-6">
              {modalConfig.message}
            </Text>

            <View className="flex-row justify-between mt-2">
              <TouchableOpacity
                className="flex-1 py-3 mr-2 rounded-lg bg-gray-200"
                onPress={closeModal}
              >
                <Text className="text-center font-semibold text-gray-700">
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 py-3 ml-2 rounded-lg bg-red-600"
                onPress={() => {
                  closeModal();
                  modalConfig.onConfirm();
                }}
              >
                <Text className="text-center font-semibold text-white">
                  {modalConfig.confirmText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
}
