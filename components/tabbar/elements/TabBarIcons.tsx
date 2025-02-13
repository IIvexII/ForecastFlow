import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import MapIcon from "../icons/MapIcon";
import ListIcon from "../icons/ListIcon";

type TabBarIconsProps = {
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export default function TabBarIcons(props: TabBarIconsProps) {
  return (
    <View
      className={`absolute w-full flex-row items-center justify-between p-2 ${props.className}`}
      style={props.style}
    >
      <MapIcon />
      <ListIcon style={{ marginTop: 10 }} />
    </View>
  );
}

const styles = StyleSheet.create({});
