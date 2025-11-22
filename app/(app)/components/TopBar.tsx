import React from "react";
import { TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Monicon } from "@monicon/native";
import { lightTheme } from "../../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, {
  Defs,
  LinearGradient as SVGLinearGradient,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import { useRouter } from "expo-router";
import { useFontsLoaded } from "../../../src/providers/FontsProvider";

export default function TopBar() {
  const {loaded}= useFontsLoaded();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width } = useWindowDimensions();

  const fontSize = Math.min(width * 0.18, 64);
  if(!loaded){
    return null;
  }
  const handleConfigPress = () => {
    router.push("/screens/Settings");
  };

  return (
    <View
      style={{
        backgroundColor: "#FFF",
        paddingTop: insets.top + 12,
        paddingBottom: 10,
        paddingHorizontal: 14,
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowRadius: 3,
        elevation: 2,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleConfigPress}
        style={{
          position: "absolute",
          top: insets.top + 12,
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

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Svg
          width={width * 0.7}        
          height={fontSize * 1.2}     
          viewBox="0 0 300 100"       
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
            fontWeight="bold"
            x="50%"
            y="70%"              
            textAnchor="middle"
          >
            AGORA
          </SvgText>
        </Svg>
      </View>
    </View>
  );
}
