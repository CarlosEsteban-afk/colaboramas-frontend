import React from "react";
import { TextInput, View, Text, KeyboardTypeOptions } from "react-native";

type FormFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

export default function FormField({
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  keyboardType = "default",
}: FormFieldProps) {
  return (
    <View className="mb-1">
      <TextInput
        className={`
            border bg-white/90 rounded-md px-5 py-3 text-base text-blue-600
            ${error ? "border-red-500 border-2" : "border-white/50"}
        `}
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />

      <View className="h-4 mt-1">
        <Text className="text-black text-xs font-semibold ml-1">
          {error || ""}
        </Text>
      </View>
    </View>
  );
}
