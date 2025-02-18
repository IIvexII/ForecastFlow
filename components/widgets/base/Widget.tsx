import React, { cloneElement, useState } from "react";
import { View, LayoutChangeEvent, StyleSheet, Text } from "react-native";
import { Canvas, Path, RoundedRect, Shadow } from "@shopify/react-native-skia";

type WidgetsProps = {
  children: React.ReactNode;
};

export default function Widget(props: WidgetsProps) {
  const [width, setWidth] = useState(150);
  const cornerRadius = 20;

  const borderPath = `M 0 ${cornerRadius} A ${cornerRadius} ${cornerRadius} 0 0 1 ${cornerRadius} 0 L ${width - cornerRadius} 0 A ${cornerRadius} ${cornerRadius} 0 0 1 ${width} ${cornerRadius} L ${width} ${150 - cornerRadius} A ${cornerRadius} ${cornerRadius} 0 0 1 ${width - cornerRadius} 150 L ${cornerRadius} 150 A ${cornerRadius} ${cornerRadius} 0 0 1 0 ${150 - cornerRadius} Z`;

  function handleLayout(event: LayoutChangeEvent) {
    setWidth(event.nativeEvent.layout.width);
  }

  return (
    <View onLayout={handleLayout} style={{ position: "relative", width: "100%", height: 160 }}>
      <View style={styles.container}>
        <Canvas style={[StyleSheet.absoluteFillObject, { width: width + 10, height: 160 }]}>
          <RoundedRect x={0} y={0} width={width} height={150} r={cornerRadius} color={"#2D1C52"}>
            <Shadow dx={3} dy={3} blur={1} color={"rgba(0,0,0, 0.5)"} />
            <Path path={borderPath} strokeWidth={1} style={"stroke"} color={"rgba(255, 255, 255, 0.30)"} />
          </RoundedRect>
        </Canvas>
      </View>
      <View style={styles.childrenContainer}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  childrenContainer: {
    position: "relative",
    zIndex: 1,
    padding: 15,
  },
});

type WidgetHeaderProps = {
  icon: React.ReactElement;
  title: string;
};
Widget.Header = function (props: WidgetHeaderProps) {
  const icon = cloneElement(props.icon, { size: 25, color: "#C2C2C2" });

  return (
    <View style={{ flexDirection: "row", alignItems: "center", width: "100%", marginBottom: 10, gap: 10 }}>
      {icon}
      <Text
        style={{
          color: "#C2C2C2",
          fontFamily: "SF-Regular",
          lineHeight: 20,
          fontSize: 16,
          textTransform: "uppercase",
        }}
      >
        {props.title}
      </Text>
    </View>
  );
};

type WidgetBodyProps = {
  contentText?: string;
  children: React.ReactNode;
};

Widget.Body = function (props: WidgetBodyProps) {
  return (
    <View style={{ width: "100%" }}>
      {props.contentText && (
        <Text
          style={{
            color: "#FFFFFF",
            fontFamily: "SF-Regular",
            fontSize: 20,
            lineHeight: 20,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          {props.contentText}
        </Text>
      )}

      {props.children}
    </View>
  );
};
