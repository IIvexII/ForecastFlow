import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapIcon from "../icons/MapIcon";
import ListIcon from "../icons/ListIcon";

export default function TabBarIcons() {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingInline: 10,
        paddingTop: 20,
      }}
    >
      <MapIcon style={{}} />
      <ListIcon />
    </View>
  );
}

const styles = StyleSheet.create({});
