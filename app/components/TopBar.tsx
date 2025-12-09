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

  const containerHeight = 100;

  const fontSize = Math.min(width * 0.18, 64);
  const svgHeight = Math.max(fontSize * 1.3, 36); 
  const svgWidth = width * 0.6;

  const handleConfigPress = () => {
    router.push("/screens/Settings");
  };

  return (
    <View
      style={{
        backgroundColor: "#FFF",
        paddingVertical: 12,
        paddingHorizontal: 16,
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowRadius: 3,
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
        style={{ alignSelf: "center" }}
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
          x={svgWidth / 2}
          y={svgHeight / 2}
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          AGORA
        </SvgText>
      </Svg>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleConfigPress}
        style={{
          position: "absolute",
          right: 16,
          top: "50%",
          marginTop: -20, 
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.05)",
        }}
      >
        <Monicon
          name="mdi:cog"
          size={28}
          color={lightTheme.colors["primary-purple"]}
        />
      </TouchableOpacity>
    </View>
  );
}
