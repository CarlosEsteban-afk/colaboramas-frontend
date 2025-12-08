import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { lightTheme } from "../../theme";
import SendMessageModal from "./SendMessageModal";

type Props = {
  id: number;
  name: string;
  title: string;
  location: string;
  tags?: string[];
  imageUrl?: string;
  onContactSent: (id: number) => void;
};

export default function UserCard({
  id,
  name,
  title,
  location,
  tags = [],
  imageUrl,
  onContactSent,
}: Props) {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const animateCardRemoval = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -20,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onContactSent(id);
    });
  };

  return (
    <Animated.View
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
    >
      <View className="rounded-xl border border-white w-full max-w-[375px] mx-auto my-2 overflow-hidden">
        <LinearGradient
          colors={[
            lightTheme.colors["primary-pink"],
            lightTheme.colors["primary-purple"],
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="p-4"
        >
          <View className="flex-row items-center mb-2">
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                className="w-16 h-16 rounded-full border-2 border-white mr-3"
              />
            ) : (
              <View className="w-16 h-16 rounded-full border-2 border-white mr-3 bg-white/20" />
            )}
            <View className="flex-1">
              <Text className="text-lg font-semibold text-white">{name}</Text>
              <Text className="text-sm text-white mt-0.5">{title}</Text>
              <Text className="text-xs text-gray-300 mt-0.5">{location}</Text>
            </View>
          </View>

          {/* Tags */}
          {tags.length > 0 && (
            <View className="flex-row flex-wrap mt-2 gap-2">
              {tags.map((tag, i) => (
                <View key={i} className="bg-orange-500 rounded-full py-1 px-3">
                  <Text className="text-xs text-white">{tag}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Botón */}
          <TouchableOpacity
            className="bg-blue-500 py-2 px-4 rounded mt-3 self-end"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-white font-semibold">
              {t("user.contact")}
            </Text>
          </TouchableOpacity>

          <SendMessageModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            recipientId={id}
            recipientName={name}
            onContactSent={animateCardRemoval}
          />
        </LinearGradient>
      </View>
    </Animated.View>
  );
}
