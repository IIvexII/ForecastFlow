import React from "react";
import { useWindowDimensions, View } from "react-native";

import ArcComponent from "./elements/ArcComponent";
import TabBarIcons from "./elements/TabBarIcons";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";
import { useBottomSheetPosition } from "../../context/BottomSheetPosition";

export default function WeatherTabBar() {
  const tabBarHeight = 100;
  const { width } = useWindowDimensions();
  const bottomSheetPosition = useBottomSheetPosition();

  const tabBarAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            bottomSheetPosition.value,
            [0, 0.8],
            [0, bottomSheetPosition.value * tabBarHeight],
          ),
        },
      ],
    };
  });

  return (
    <Animated.View className="absolute bottom-0 z-10" style={[tabBarAnimatedStyle]}>
      <ArcComponent width={width} height={tabBarHeight} />
      <TabBarIcons height={tabBarHeight} />
    </Animated.View>
  );
}
