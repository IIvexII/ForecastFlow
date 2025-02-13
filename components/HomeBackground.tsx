import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";

export default function HomeBackground() {
  const { width, height } = useWindowDimensions();

  return (
    <View className="flex-1">
      {/* background gradient covering full screen  */}
      <Canvas className="flex-1">
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={["#2e335a", "#1c1b33"]}
          />
        </Rect>
      </Canvas>

      {/* Background Image */}
      <ImageBackground
        source={require("../assets/home/Background.png")}
        resizeMode="cover"
        className="h-full w-full"
      >
        {/* A smoke effect on bottom */}
        <Canvas style={{ ...StyleSheet.absoluteFillObject, top: "50%" }}>
          <Rect x={0} y={0} width={width} height={height * 0.5}>
            <LinearGradient
              start={vec(width / 2, 0)}
              end={vec(width / 2, height)}
              colors={["rgba(58, 63, 84, 0)", "rgba(58, 63, 84, 1)"]}
              positions={[0, 0.4]}
            />
          </Rect>
        </Canvas>
        <Image
          source={require("../assets/home/House.png")}
          resizeMode="cover"
          className="absolute bottom-1/4 h-auto w-full"
        />
      </ImageBackground>
    </View>
  );
}
