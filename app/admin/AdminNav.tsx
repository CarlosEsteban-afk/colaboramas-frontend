import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { lightTheme } from "../../theme";

export default function AdminNav() {
  const router = useRouter();
  const go = (path: string) => router.push(path);

  return (
    <View style={styles.nav}>
      <TouchableOpacity style={styles.item} onPress={() => go('/admin')}>
        <Text style={styles.text}>Resumen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => go('/admin/users')}>
        <Text style={styles.text}>Usuarios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => go('/admin/events')}>
        <Text style={styles.text}>Eventos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => go('/admin/settings')}>
        <Text style={styles.text}>Ajustes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    zIndex: 50,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
  },
  item: { paddingHorizontal: 8 },
  text: { color: lightTheme.colors['primary-purple'], fontWeight: '700' }
});
