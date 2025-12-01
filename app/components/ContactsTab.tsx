import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../theme";
import { useContacts } from "../../src/hooks/useContact";
import { useTranslation } from "react-i18next";

interface Props {
  type: "recibidas" | "enviadas" | "contestadas";
}

export default function ContactsTab({ type }: Props) {
  const { t } = useTranslation();
  const { receivedMessages, sentMessages, repliedMessages, respondToMessage } = useContacts();

  const data =
    type === "recibidas"
      ? receivedMessages
      : type === "enviadas"
      ? sentMessages
      : repliedMessages;

  if (data.length === 0) {
    return (
      <Text className="text-center mt-5" style={{ color: "#666" }}>
        {t("contacts.empty", { type: t(`contacts.tabs.${type}`) })}
      </Text>
    );
  }

  return (
    <View className="flex-col w-full space-y-2 max-w-[375px] mx-auto">
      {data.map((c, index) => {
        const user = type === "recibidas" ? c.fromUser : c.toUser;

        return (
          <LinearGradient
            key={index}
            colors={[lightTheme.colors["primary-pink"], lightTheme.colors["primary-purple"]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-lg p-1"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <View className="rounded-lg p-4 bg-transparent space-y-2">
              <View className="flex-row items-center space-x-3">
                <Image
                  source={{ uri: user.imageUrl }}
                  className="w-10 h-10 rounded-full"
                />
                <View className="flex-col">
                  <Text className="text-white font-bold text-base">{user.username}</Text>
                  <Text className="text-white text-sm">{user.email}</Text>
                </View>
              </View>

              <Text className="text-white">{c.message}</Text>

              {type === "recibidas" && (
                <View className="flex-row justify-end space-x-2">
                  <TouchableOpacity
                    className="rounded-md px-3 py-1"
                    style={{ backgroundColor: "#E91E63" }}
                    onPress={() => respondToMessage(c.id, false)}
                  >
                    <Text className="text-white font-semibold">
                      {t("contacts.actions.reject")}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="rounded-md px-3 py-1"
                    style={{ backgroundColor: "#82A50B" }}
                    onPress={() => respondToMessage(c.id, true)}
                  >
                    <Text className="text-white font-semibold">
                      {t("contacts.actions.accept")}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {type === "enviadas" && (
                <View className="items-end">
                  <TouchableOpacity
                    className="rounded-md px-3 py-1"
                    style={{ backgroundColor: lightTheme.colors["orange"] }}
                  >
                    <Text className="text-white font-semibold">
                      {t("contacts.status.pending")}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {type === "contestadas" && (
                <View className="items-end">
                  <TouchableOpacity
                    className="rounded-md px-3 py-1"
                    style={{
                      backgroundColor:
                        c.status === "aceptada" ? "#82A50B" : "#E91E63",
                    }}
                  >
                    <Text className="text-white font-semibold">
                      {c.status === "aceptada"
                        ? t("contacts.status.accepted")
                        : t("contacts.status.rejected")}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </LinearGradient>
        );
      })}
    </View>
  );
}
