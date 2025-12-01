import React from "react";
import { TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Monicon } from "@monicon/native";
import { lightTheme } from "../../theme";
import Svg, {
  Defs,
  LinearGradient as SVGLinearGradient,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import { useRouter } from "expo-router";
import { useFontsLoaded } from "../../src/providers/FontsProvider";

export default function TopBar() {
  const fontsLoaded = useFontsLoaded();
  const router = useRouter();
  const { width } = useWindowDimensions();

  if (!fontsLoaded) return null;

  const fontSize = Math.min(width * 0.18, 64);
  const svgHeight = fontSize * 1.3;
  const svgWidth = width * 0.7;

  const handleConfigPress = () => {
    router.push("/screens/Settings");
  };

  return (
    <View
      style={{
        backgroundColor: "#FFF",
        paddingTop: 16,       // ← ya NO depende del safe area
        paddingBottom: 10,
        paddingHorizontal: 14,
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowRadius: 3,
        elevation: 2,
      }}
    >
      {/* Botón de configuración */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleConfigPress}
        style={{
          position: "absolute",
          top: 16,   // ← antes usaba insets, ahora NO
          right: 20,
          zIndex: 20,
        }}
      >
        <Monicon
          name="mdi:cog"
          size={28}
          color={lightTheme.colors["primary-purple"]}
        />
      </TouchableOpacity>

      {/* Logo con SVG */}
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Svg
          width={svgWidth}
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <Defs>
            <SVGLinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor={lightTheme.colors["primary-pink"]} />
              <Stop offset="1" stopColor={lightTheme.colors["primary-purple"]} />
            </SVGLinearGradient>
          </Defs>

          <SvgText
            fill="url(#grad)"
            fontSize={fontSize}
            fontFamily="CinzelDecorative_400Regular"
            fontWeight="400"
            fontStyle="normal"
            x="50%"
            y="50%"
            textAnchor="middle"
            dy={fontSize * 0.12} 
          >
            AGORA
          </SvgText>
        </Svg>
      </View>
    </View>
  );
}
