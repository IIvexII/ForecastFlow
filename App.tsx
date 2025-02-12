import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { green } from "react-native-reanimated/lib/typescript/Colors";

export default function App() {
  return (
    <Canvas style={{ flex: 1 }}>
      <Rect x={0} y={0} width={200} height={200}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(180, 180)}
          colors={["red", "blue", "green"]}
        />
      </Rect>
    </Canvas>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
