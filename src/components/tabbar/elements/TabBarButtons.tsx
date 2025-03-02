import React from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import CircleButton from "./CircleButton";
import TrapizoidBackground from "./TrapizoidBackground";

import MapIcon from "../icons/MapIcon";
import ListIcon from "../icons/ListIcon";

type TabBarIconsProps = {
  style?: StyleProp<ViewStyle>;
  height: number;

  onCurrentLocationPress: () => void;
  onAddLocationPress: () => void;
  onWeatherListPress: () => void;
};

const TabBarButtons = (props: TabBarIconsProps) => {
  return (
    <View style={[styles.container, props.style]}>
      <Pressable onPress={props.onCurrentLocationPress} hitSlop={10}>
        <MapIcon style={styles.icon} />
      </Pressable>
      <TrapizoidBackground>
        <CircleButton onPress={props.onAddLocationPress} />
      </TrapizoidBackground>
      <Pressable onPress={props.onWeatherListPress} hitSlop={20}>
        <ListIcon style={styles.icon} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  icon: {
    marginTop: 26,
  },
});

export default React.memo(TabBarButtons);
