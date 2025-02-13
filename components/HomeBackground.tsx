import React from "react";
import {
  Image,
  ImageBackground,
  ScaledSize,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  Canvas,
  Line,
  LinearGradient,
  Rect,
  vec,
} from "@shopify/react-native-skia";

export default function HomeBackground() {
  const { width, height } = useWindowDimensions();

  const myStyle = styles(width);

  return (
    <View style={{ flex: 1, ...StyleSheet.absoluteFillObject }}>
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={["#2e335a", "#1c1b33"]}
          />
        </Rect>
      </Canvas>
      <ImageBackground
        source={require("../assets/home/Background.png")}
        resizeMode='cover'
        style={{ height: "100%" }}
      >
        <Canvas style={{ ...StyleSheet.absoluteFillObject, top: "50%" }}>
          <Rect x={0} y={0} width={width} height={height * 0.5}>
            <LinearGradient
              start={vec(width / 2, 0)}
              end={vec(width / 2, height)}
              colors={["rgba(58, 63, 84, 0)", "rgba(58, 63, 84, 1)"]}
              positions={[0, 0.3]}
            />
          </Rect>
        </Canvas>
        <Image
          source={require("../assets/home/House.png")}
          resizeMode='cover'
          style={myStyle.bacngroundImage}
        />
      </ImageBackground>
    </View>
  );
}

const styles = (width: number) =>
  StyleSheet.create({
    bacngroundImage: {
      width: width,
      height: width,
      ...StyleSheet.absoluteFillObject,
      top: "20%",
    },
  });
