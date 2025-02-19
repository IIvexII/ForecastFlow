import React from "react";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { Image, ImageBackground, StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated";

import { Weather } from "../models/Weather";
import WeatherInfo from "./sections/WeatherInfo";
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

  const backgroundPositionStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(animatedPosition.value, [0, 1], [0, -height], Extrapolation.CLAMP) },
    ],
    opacity: interpolate(animatedPosition.value, [0, 0.5], [1, 0], Extrapolation.CLAMP),
  }));

  return (
    <View style={styles.container}>
      <WeatherInfo weather={WEATHER} />

      <Canvas style={styles.absolute}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient start={vec(0, 0)} end={vec(width, height)} colors={["#2e335a", "#1c1b33"]} />
        </Rect>
      </Canvas>

      <AnimatedImageBackground
        style={[styles.backgroundImage, backgroundPositionStyle]}
        source={require("../assets/home/Background.png")}
        resizeMode="cover"
      >
        <Canvas style={styles.smokeEffect}>
          <Rect x={0} y={0} width={width} height={height * 0.5}>
            <LinearGradient
              start={vec(width / 2, 0)}
              end={vec(width / 2, height)}
              colors={["rgba(58, 63, 84, 0)", "rgba(58, 63, 84, 1)"]}
              positions={[0, 0.4]}
            />
          </Rect>
        </Canvas>
        <View style={[styles.absolute, styles.container]}>
          <Image
            source={require("../assets/home/House.png")}
            resizeMode="stretch"
            style={styles.houseImage}
          />
        </View>
      </AnimatedImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  smokeEffect: {
    ...StyleSheet.absoluteFillObject,
    top: "50%",
  },
  houseImage: {
    position: "absolute",
    bottom: "20%",
    width: "100%",
    height: "40%",
  },
});
