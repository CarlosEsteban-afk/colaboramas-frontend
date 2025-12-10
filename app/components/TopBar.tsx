import React from "react";
import { TouchableOpacity, View, useWindowDimensions, Platform } from "react-native";
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

  // 🔧 Nuevo cálculo responsive
  const maxFontSize = 48;               // límite para que no explote en celular
  const minFontSize = 28;               // tamaño mínimo legible
  const fontSize = Math.max(
    Math.min(width * 0.16, maxFontSize),
    minFontSize
  );

  const svgWidth = width * 0.65;        // más estrecho para móviles
  const svgHeight = fontSize * 1.7;

  const containerHeight = svgHeight + 40;  // altura dinámica según fontSize

  const handleConfigPress = () => {
    router.push("/screens/Settings");
  };

  return (
    <View
      style={{
        backgroundColor: "#FFF",
        paddingTop: 10,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        height: containerHeight,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Logo SVG centrado */}
      <Svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        preserveAspectRatio="xMidYMid meet"
        style={{
          alignSelf: "center",
          overflow: "visible",
        }}
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
          x={svgWidth / 2}
          y={svgHeight / 2}
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          AGORA
        </SvgText>
      </Svg>

      {/* Botón Configuración */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleConfigPress}
        style={{
          position: "absolute",
          right: 18,
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Monicon
          name="mdi:cog"
          size={26}
          color={lightTheme.colors["primary-purple"]}
        />
      </TouchableOpacity>
    </View>
  );
}