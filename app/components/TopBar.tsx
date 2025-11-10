import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Monicon } from "@monicon/native";
import { lightTheme } from "../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, {
  Defs,
  LinearGradient as SVGLinearGradient,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import { useRouter } from "expo-router"; // 🔹 import router

export default function TopBar() {
  const insets = useSafeAreaInsets();
  const router = useRouter(); // 🔹 inicializamos router

  const handleConfigPress = () => {
    router.push("/screens/Settings"); // 🔹 ruta al pulsar el botón
  };

  return (
    <View
      style={{
        backgroundColor: "#FFF",
        paddingTop: insets.top + 10,
        paddingBottom: 4,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      {/* Botón de configuración */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleConfigPress} // 🔹 aquí llamamos a la función
        style={{
          position: "absolute",
          top: insets.top + 10,
          right: 16,
          backgroundColor: "transparent",
          zIndex:10
        }}
      >
        <Monicon
          name="mdi:cog"
          size={28}
          color={lightTheme.colors["primary-purple"]}
        />
      </TouchableOpacity>

      {/* 🔹 Título AGORA */}
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Svg viewBox="0 -5 80 30" width="100%" height="60">
          <Defs>
            <SVGLinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor={lightTheme.colors["primary-pink"]} />
              <Stop offset="1" stopColor={lightTheme.colors["primary-purple"]} />
            </SVGLinearGradient>
          </Defs>

          <SvgText
            fill="url(#grad)"
            fontSize="64"
            fontFamily="CinzelDecorative_400Regular"
            fontWeight="bold"
            x="50%"
            y="55%"
            textAnchor="middle"
          >
            AGORA
          </SvgText>
        </Svg>
      </View>
    </View>
  );
}
