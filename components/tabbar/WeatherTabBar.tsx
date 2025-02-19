import React from "react";
import { StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";

import TabBarIcons from "./elements/TabBarIcons";
import ArcComponent from "./elements/ArcComponent";
import { useBottomSheetPosition } from "../../context/BottomSheetPosition";

const TAB_BAR_HEIGHT = 100;

const WeatherTabBar: React.FC = () => {
  const { width } = useWindowDimensions();
  const bottomSheetPosition = useBottomSheetPosition();

  const tabBarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          bottomSheetPosition.value,
          [0, 0.8],
          [0, bottomSheetPosition.value * TAB_BAR_HEIGHT],
        ),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.tabBar, tabBarAnimatedStyle]}>
      <ArcComponent width={width} height={TAB_BAR_HEIGHT} />
      <TabBarIcons height={TAB_BAR_HEIGHT} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    zIndex: 10,
  },
});

export default WeatherTabBar;
