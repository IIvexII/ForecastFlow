import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import ArcComponent from "./elements/ArcComponent";
import TabBarIcons from "./elements/TabBarIcons";

export default function WeatherTabBar() {
  const tabBarHeight = 100;
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={{
        height: tabBarHeight,
        ...StyleSheet.absoluteFillObject,
        top: height - tabBarHeight,
      }}
    >
      <ArcComponent width={width} height={tabBarHeight} />
      <TabBarIcons />
    </View>
  );
}
