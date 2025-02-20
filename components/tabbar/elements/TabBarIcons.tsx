import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import MapIcon from "../icons/MapIcon";
import ListIcon from "../icons/ListIcon";
import TrapizoidBackground from "./TrapizoidBackground";

type TabBarIconsProps = {
  style?: StyleProp<ViewStyle>;
  height: number;
};

const TabBarIcons = React.memo((props: TabBarIconsProps) => {
  const navigation = useNavigation<NativeStackScreenProps<RootStackParamList>["navigation"]>();

  return (
    <View style={[styles.container, props.style]}>
      <MapIcon style={styles.icon} />
      <TrapizoidBackground />
      <Pressable onPress={() => navigation.navigate("Search")}>
        <ListIcon style={styles.icon} />
      </Pressable>
    </View>
  );
});

TabBarIcons.displayName = "TabBarIcons";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24, // px-6 converts to 24 in React Native
  },
  icon: {
    marginTop: 26,
  },
});

export default TabBarIcons;
