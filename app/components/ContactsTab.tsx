import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../theme";
import { useContacts } from "../../src/hooks/useContact";
import { useTranslation } from "react-i18next";

interface Props {
  type: "recibidas" | "enviadas" | "contestadas";
}

export default function ContactsTab({ type }: Props) {
  const { t } = useTranslation();
  const { receivedMessages, sentMessages, repliedMessages, respondToMessage } =
    useContacts();

  const data =
    type === "recibidas"
      ? receivedMessages
      : type === "enviadas"
      ? sentMessages
      : repliedMessages;

  if (data.length === 0) {
    return (
      <Text style={{ color: "#666", textAlign: "center", marginTop: 20 }}>
        {t("contacts.empty", { type: t(`contacts.tabs.${type}`) })}
      </Text>
    );
  }

  return (
    <View style={{ gap: 10 }}>
      {data.map((c, index) => (
        <LinearGradient
          key={index}
          colors={[
            lightTheme.colors["primary-pink"],
            lightTheme.colors["primary-purple"],
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.innerCard}>
            <Text style={styles.name}>
              {type === "recibidas" ? c.fromUserId : `${c.toUserId}`}
            </Text>
            <Text style={styles.message}>{c.message}</Text>

            {type === "recibidas" && (
              <View style={styles.row}>
                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: "#E91E63" }]}
                  onPress={() => respondToMessage(c.id, false)}  // rechazar solicitud
                >
                  <Text style={styles.btnText}>{t("contacts.actions.reject")}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: "#82A50B" }]}
                  onPress={() => respondToMessage(c.id, true)}   // aceptar solicitud
                >
                  <Text style={styles.btnText}>{t("contacts.actions.accept")}</Text>
                </TouchableOpacity>
              </View>
            )}

            {type === "enviadas" && (
              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity
                  style={[
                    styles.btn,
                    { backgroundColor: lightTheme.colors["orange"] },
                  ]}
                >
                  <Text style={styles.btnText}>{t("contacts.status.pending")}</Text>
                </TouchableOpacity>
              </View>
            )}

            {type === "contestadas" && (
              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity
                  style={[
                    styles.btn,
                    {
                      backgroundColor:
                        c.status === "aceptada" ? "#82A50B" : "#E91E63",
                    },
                  ]}
                >
                  <Text style={styles.btnText}>
                    {c.status === "aceptada"
                      ? t("contacts.status.accepted")
                      : t("contacts.status.rejected")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </LinearGradient>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    padding: 2,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  innerCard: {
    borderRadius: 6,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
  message: {
    marginBottom: 12,
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  btn: {
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  btnText: {
    color: "#FFF",
    fontWeight: "600",
  },
});
