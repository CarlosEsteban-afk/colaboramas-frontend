import React from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../theme";

type Props = {
  name: string;
  title: string;
  location: string;
  tags?: string[];
  imageUrl?: string;
};

export default function ProfileCard({
  name,
  title,
  location,
  tags = [],
  imageUrl,
}: Props) {
  return (
    <View className="rounded-xl border border-white w-full max-w-[375px] mx-auto my-4 overflow-hidden shadow-lg">
      <LinearGradient
        colors={[
          lightTheme.colors["primary-pink"],
          lightTheme.colors["primary-purple"],
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-5"
      >
        {/* Cabecera: Imagen y datos */}
        <View className="flex-row items-center mb-4">
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              className="w-20 h-20 rounded-full border-2 border-white mr-4"
            />
          ) : (
            <View className="w-20 h-20 rounded-full border-2 border-white mr-4 bg-white/20" />
          )}
          <View className="flex-1">
            <Text className="text-xl font-bold text-white">{name}</Text>
            <Text className="text-md text-white mt-0.5">{title}</Text>
            <Text className="text-sm text-gray-200 mt-0.5">{location}</Text>
          </View>
        </View>

        {/* Tags */}
        {tags.length > 0 && (
          <View className="flex-row flex-wrap gap-2">
            {tags.map((tag, i) => (
              <View key={i} className="bg-orange-500 rounded-full py-1 px-3">
                <Text className="text-xs text-white">{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </LinearGradient>
    </View>
  );
}
