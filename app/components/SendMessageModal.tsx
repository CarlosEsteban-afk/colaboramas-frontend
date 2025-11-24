import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { lightTheme } from "../../theme";
import { useContacts } from "../../src/hooks/useContact";
import { useUser } from "../../src/hooks/useUser";

type Props = {
  visible: boolean;
  onClose: () => void;
  recipientId: number;
  recipientName: string;
};

export default function SendMessageModal({
  visible,
  onClose,
  recipientId,
  recipientName,
}: Props) {
  const { user: currentUser } = useUser();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const { sendMessage } = useContacts();

  // 🔹 Animaciones
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const errorOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      opacityAnim.setValue(0);
      scaleAnim.setValue(0.9);
      setError("");
    }
  }, [visible]);

  useEffect(() => {
    Animated.timing(errorOpacity, {
      toValue: error ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [error]);

  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) {
      setError(t("sendMessageModal.errorEmptyFields"));
      return;
    }

     try {
        await sendMessage({
          fromUserId: currentUser.id,
          toUserId: recipientId,
          subject,
          message,
        });

        setSubject("");
        setMessage("");
        setError("");
        onClose();
      } catch (err) {
        console.log(err);
        setError(t("sendMessageModal.errorSending"));
      }
  };

  return (
    <Modal transparent visible={visible} animationType="none">
      <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
        <Animated.View
          style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
        >
          <Text style={styles.title}>
            {t("sendMessageModal.title", { name: recipientName })}
          </Text>
          <Text style={styles.subtitle}>{t("sendMessageModal.subtitle")}</Text>

          <TextInput
            style={styles.input}
            placeholder={t("sendMessageModal.subjectPlaceholder")}
            value={subject}
            onChangeText={(text) => {
              setSubject(text);
              setError("");
            }}
          />
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder={t("sendMessageModal.messagePlaceholder")}
            value={message}
            onChangeText={(text) => {
              setMessage(text);
              setError("");
            }}
            multiline
          />

          {error ? (
            <Animated.Text
              style={[
                styles.error,
                { opacity: errorOpacity, transform: [{ translateY: 2 }] },
              ]}
            >
              {error}
            </Animated.Text>
          ) : null}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancel} onPress={onClose}>
              <Text style={styles.cancelText}>
                {t("sendMessageModal.cancel")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSend}>
              <LinearGradient
                colors={[
                  lightTheme.colors["primary-pink"],
                  lightTheme.colors["primary-purple"],
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.send}
              >
                <Text style={styles.sendText}>
                  {t("sendMessageModal.send")}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 25,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: lightTheme.colors["primary-purple"],
  },
  subtitle: {
    fontSize: 13,
    color: lightTheme.colors["dark-gray"],
    marginBottom: 10,
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
    fontSize: 14,
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  error: {
    color: "#E91E63",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 6,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  cancel: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  cancelText: {
    color: lightTheme.colors["dark-gray"],
  },
  send: {
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendText: {
    color: "#fff",
    fontWeight: "600",
  },
});
