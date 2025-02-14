import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import MapIcon from "../icons/MapIcon";
import ListIcon from "../icons/ListIcon";
import TrapizoidBackground from "./TrapizoidBackground";

type TabBarIconsProps = {
  className?: string;
  style?: StyleProp<ViewStyle>;
  height: number;
};

export default function TabBarIcons(props: TabBarIconsProps) {
  return (
    <View
      className={`absolute bottom-0 w-full flex-1 flex-row items-center justify-between px-6 ${props.className}`}
      style={[props.style]}
    >
      <MapIcon style={{ marginTop: 26 }} />
      <TrapizoidBackground />
      <ListIcon style={{ marginTop: 26 }} />
    </View>
  );
}

const styles = StyleSheet.create({});
