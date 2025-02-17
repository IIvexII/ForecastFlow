import React from "react";
import { useWindowDimensions, View } from "react-native";

import ArcComponent from "./elements/ArcComponent";
import TabBarIcons from "./elements/TabBarIcons";

export default function WeatherTabBar() {
  const tabBarHeight = 100;
  const { width } = useWindowDimensions();

  return (
    <View className="absolute bottom-0 z-10">
      <ArcComponent width={width} height={tabBarHeight} />
      <TabBarIcons height={tabBarHeight} />
    </View>
  );
}
