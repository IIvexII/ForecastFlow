import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomSheetPosition } from "../../context/BottomSheetPosition";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";

type PlaceholderProps = {
  width: number;
  animatedStyle: {
    height: number;
  };
};

const WeatherInfoSkeleton = () => {
  const { top } = useSafeAreaInsets();
  const bottomSheetPosition = useBottomSheetPosition();

  // animated styles matching WeatherInfo
  const animatedCityStyle = useAnimatedStyle(() => ({
    marginTop: interpolate(bottomSheetPosition.value, [0, 1], [0, -20], Extrapolation.CLAMP),
  }));

  const animatedTempStyle = useAnimatedStyle(() => ({
    height: interpolate(bottomSheetPosition.value, [0, 1], [96, 52], Extrapolation.CLAMP),
    marginTop: 10,
  }));

  const animatedConditionStyle = useAnimatedStyle(() => ({
    height: interpolate(bottomSheetPosition.value, [0, 1], [36, 18], Extrapolation.CLAMP),
    marginTop: 10,
  }));

  const animatedHighLowStyle = useAnimatedStyle(() => ({
    height: interpolate(bottomSheetPosition.value, [0, 1], [24, 18], Extrapolation.CLAMP),
    marginTop: 10,
  }));

  const animatedBottomInfoContainerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(bottomSheetPosition.value, [0, 0.5, 1], [1, 0, 1], Extrapolation.CLAMP),
    flexDirection: bottomSheetPosition.value > 0.5 ? "row" : "column",
    justifyContent: "space-between",
    gap: 12,
  }));

  // Wave animation setup
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 2000 }),
      -1, // Infinite loop
      true
    );
  }, []);

  // Reusable Placeholder component with wave animation
  const Placeholder: React.FC<PlaceholderProps> = ({ width, animatedStyle }) => {
    const animatedGradientStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: progress.value * (-2 * width) }],
    }));

    return (
      <Animated.View
        style={[
          { width, overflow: "hidden", borderRadius: 10, backgroundColor: "rgba(216, 191, 216, 0.2)" },
          animatedStyle,
        ]}
      >
        <Animated.View
          style={[
            { width: 2 * width, height: "100%", backgroundColor: "gba(216, 191, 216, 0.4)" },
            animatedGradientStyle,
          ]}
        >
          <LinearGradient
            colors={["transparent", "rgba(234 204 255 / 0.3)", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: "100%", height: "100%" }}
          />
        </Animated.View>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { top: top + 40 }]}>
      <View>
        {/* City Placeholder */}
        <Animated.View style={[animatedCityStyle]}>
          <Placeholder width={200} animatedStyle={{ height: 36 }} />
        </Animated.View>

        {/* Bottom Info Container */}
        <Animated.View style={[animatedBottomInfoContainerStyle, { alignItems: "center", gap: 10 }]}>
          {/* Temperature Placeholder */}
          <Placeholder width={150} animatedStyle={animatedTempStyle} />

          {/* Condition and High/Low Container */}
          <View>
            <Placeholder width={200} animatedStyle={animatedConditionStyle} />
            <View style={styles.highLowContainer}>
              <Placeholder width={75} animatedStyle={animatedHighLowStyle} />
              <Placeholder width={75} animatedStyle={animatedHighLowStyle} />
            </View>
          </View>
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
  highLowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default WeatherInfoSkeleton;
