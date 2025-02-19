import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Weather } from "../../models/Weather";
import { DEGREE_SYMBOL } from "../../utils/constants";
import { StyleSheet } from "react-native";
import { useBottomSheetPosition } from "../../context/BottomSheetPosition";
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated";

interface WeatherInfoProps {
  weather: Weather;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather }) => {
  const { top } = useSafeAreaInsets();
  const bottomSheetPosition = useBottomSheetPosition();
  const { city, condition, temperature, high, low } = weather;

  // animation
  // city text style
  const animatedCityStyle = useAnimatedStyle(() => ({
    marginTop: interpolate(bottomSheetPosition.value, [0, 1], [0, -20], Extrapolation.CLAMP),
  }));
  // temprature text style
  const animatedTempStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(bottomSheetPosition.value, [0, 1], [96, 52], Extrapolation.CLAMP),
    lineHeight: interpolate(bottomSheetPosition.value, [0, 1], [96, 52], Extrapolation.CLAMP),
  }));
  // condition text style
  const animatedConditionStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(bottomSheetPosition.value, [0, 1], [36, 18], Extrapolation.CLAMP),
    lineHeight: interpolate(bottomSheetPosition.value, [0, 1], [36, 18], Extrapolation.CLAMP),
  }));
  // low high text style
  const animatedHighLowStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(bottomSheetPosition.value, [0, 1], [24, 18], Extrapolation.CLAMP),
    lineHeight: interpolate(bottomSheetPosition.value, [0, 1], [24, 18], Extrapolation.CLAMP),
  }));

  //  container style of bottom info - temprature, condition, high, low
  const animatedBottomInfoContainerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(bottomSheetPosition.value, [0, 0.5, 1], [1, 0, 1], Extrapolation.CLAMP),
    flexDirection: bottomSheetPosition.value > 0.5 ? "row" : "column",
    justifyContent: "space-between",
    gap: 12,
  }));

  return (
    <View style={[styles.container, { top: top + 40 }]}>
      <View>
        <Animated.Text style={[styles.cityText, animatedCityStyle]}>{city}</Animated.Text>

        <Animated.View style={[animatedBottomInfoContainerStyle]}>
          {/* Temprature Text */}
          <Animated.Text style={[styles.temperatureText, animatedTempStyle]}>
            {temperature}
            {DEGREE_SYMBOL}
          </Animated.Text>

          {/* condition high low container */}
          <Animated.View>
            <Animated.Text style={[styles.conditionText, animatedConditionStyle]}>{condition}</Animated.Text>
            <Animated.View style={[styles.highLowContainer]}>
              <Animated.Text style={[styles.highLowText, animatedHighLowStyle]}>H:{high}°</Animated.Text>
              <Animated.Text style={[styles.highLowText, animatedHighLowStyle]}>L:{low}°</Animated.Text>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cityText: {
    marginBottom: 16,
    fontFamily: "SF-Regular",
    fontSize: 36,
    lineHeight: 36,
    color: "white",
    textAlign: "center",
  },
  temperatureText: {
    alignSelf: "center",
    fontFamily: "SF-Thin",
    fontSize: 96,
    lineHeight: 96,
    color: "white",
  },
  conditionText: {
    marginBottom: 8,
    alignSelf: "center",
    fontFamily: "SF-Semibold",
    fontSize: 36,
    lineHeight: 36,
    color: "#FFFFFFD3",
  },
  highLowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  highLowText: {
    fontFamily: "SF-Regular",
    fontSize: 24,
    lineHeight: 30,
    color: "white",
  },
});

export default WeatherInfo;
