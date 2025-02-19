import React from "react";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated";
import { Image, ImageBackground, StyleSheet, useWindowDimensions, View } from "react-native";

import WeatherInfo from "./sections/WeatherInfo";
import { Weather } from "../models/Weather";
import { useBottomSheetPosition } from "../context/BottomSheetPosition";

const WEATHER: Weather = {
  city: "San Francisco",
  temperature: 12,
  condition: "Mostly Clear",
  high: 20,
  low: 10,
};

export default function HomeBackground() {
  const { width, height } = useWindowDimensions();
  const animatedPosition = useBottomSheetPosition();

  const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

  const backgroundPositionStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(animatedPosition.value, [0, 1], [0, -height], Extrapolation.CLAMP) },
      ],
      opacity: interpolate(animatedPosition.value, [0, 0.5], [1, 0], Extrapolation.CLAMP),
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <WeatherInfo weather={WEATHER} />

      <Canvas style={{ ...StyleSheet.absoluteFillObject }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient start={vec(0, 0)} end={vec(width, height)} colors={["#2e335a", "#1c1b33"]} />
        </Rect>
      </Canvas>
      {/* Background Image */}
      <AnimatedImageBackground
        style={[backgroundPositionStyle]}
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
      </AnimatedImageBackground>
    </View>
  );
}
