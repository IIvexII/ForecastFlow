import React from "react";
import { StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated";

import TabBarButtons from "./elements/TabBarButtons";
import ArcComponent from "./elements/ArcComponent";
import { useBottomSheetPosition } from "../../context/BottomSheetPosition";

const TAB_BAR_HEIGHT = 100;

type WeatherTabBarProps = {
  onCurrentLocationPress: () => void;
  onAddLocationPress: () => void;
  onWeatherListPress: () => void;
};

const WeatherTabBar: React.FC<WeatherTabBarProps> = (props) => {
  const { width } = useWindowDimensions();
  const bottomSheetPosition = useBottomSheetPosition();

  const tabBarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          bottomSheetPosition.value,
          [0, 0.8],
          [0, bottomSheetPosition.value * 1.5 * TAB_BAR_HEIGHT],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.tabBar, tabBarAnimatedStyle]}>
      <ArcComponent width={width} height={TAB_BAR_HEIGHT} />
      <TabBarButtons height={TAB_BAR_HEIGHT} {...props} />
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
