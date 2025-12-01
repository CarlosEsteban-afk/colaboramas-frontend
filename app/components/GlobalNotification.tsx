import React, { useContext, useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { ContactsContext } from "../../src/providers/ContactsProvider";
export default function GlobalNotifications() {
  const { notifications, setNotifications } = useContext(ContactsContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (notifications.length > 0) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        setNotifications((prev) => prev.slice(1)); 
        fadeAnim.setValue(0);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [notifications]);

  if (notifications.length === 0) return null;

  const msg = notifications[0];

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.text}>
        Nuevo mensaje de {msg.fromUser.username}: {msg.message}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    padding: 12,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    zIndex: 9999,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
