import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";

export default function Select({ label, options, value, onSelect }) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  // PAGINACIÓN
  const PAGE_SIZE = 40;
  const [visibleOptions, setVisibleOptions] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  // Cada vez que abra el modal, cargamos primeros 40
  const openModal = () => {
    setPage(1);
    setVisibleOptions(options.slice(0, PAGE_SIZE));
    setOpen(true);
  };

  // Cuando scrollea al final → cargar más
  const loadMore = () => {
    const nextPage = page + 1;
    const next = options.slice(0, nextPage * PAGE_SIZE);
    setVisibleOptions(next);
    setPage(nextPage);
  };

  return (
    <View className="mb-4">
      <Text className="text-white mb-1">{label}</Text>

      <TouchableOpacity
        className="bg-white rounded-lg px-3 py-3 border border-gray-300"
        onPress={openModal}
      >
        <Text className="text-gray-800">
          {selectedValue || `Selecciona ${label}`}
        </Text>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.1)",
              justifyContent: "center",
              paddingHorizontal: 20,
            }}
          >
            <View className="bg-white rounded-lg max-h-72 overflow-hidden">
              <FlatList
                data={visibleOptions}
                keyExtractor={(item, index) => `${label}-${item}-${index}`}
                onEndReached={loadMore}
                onEndReachedThreshold={0.3}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="px-4 py-3 border-b border-gray-200"
                    onPress={() => {
                      onSelect(item);
                      setSelectedValue(item);
                      setOpen(false);
                    }}
                  >
                    <Text className="text-gray-800">{item}</Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <View className="px-4 py-3">
                    <Text className="text-gray-500 text-center italic">
                      No hay opciones disponibles
                    </Text>
                  </View>
                }
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
