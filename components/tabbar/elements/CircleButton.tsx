import React from "react";
import { Modal, Pressable, Text, useWindowDimensions, View } from "react-native";
import { Canvas, Circle, LinearGradient, Path, Shadow, vec } from "@shopify/react-native-skia";
import WeatherCityModal from "../../WeatherCityModel";
import { useWeather } from "../../../context/WeatherContext";
import { fetchWeather } from "../../../services/weatherService";

export default function CircleButton() {
  const { width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = React.useState(true);
  const { setWeatherData, setIsLoading } = useWeather();

  const TrapozoidLocation = 42;
  const TrapozoidHeight = 124;

  const onSelectedCity = async (city: string) => {
    try {
      setIsLoading(true);
      const data = await fetchWeather(city);
      if (data) setWeatherData(data);
    } catch (error) {
      console.error("Error getting current location:", error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <WeatherCityModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onSelected={onSelectedCity}
      />
      <Pressable
        style={{ position: "absolute", left: width / 2 - 30, top: 12 }}
        onPress={() => setModalVisible(true)}
      >
        <Canvas style={{ width: 85, height: 85 }}>
          <Circle cx={42} cy={42} r={40} style={"fill"}>
            <LinearGradient
              start={vec(width / 2, 0)}
              end={vec(width / 2, TrapozoidHeight)}
              colors={["#F5F5F9", "#DADFE7"]}
            />
            <Shadow blur={2} color={"#FFFF"} dx={0} dy={0} />
          </Circle>
          <Path
            path={`M${TrapozoidLocation} 30 L${TrapozoidLocation} 60 `}
            strokeWidth={6}
            style={"stroke"}
            color={"#3E3F78"}
            strokeCap={"round"}
          />
          <Path
            path={`M${TrapozoidLocation - 15} 45 L${TrapozoidLocation + 15} 45 `}
            strokeWidth={6}
            style={"stroke"}
            color={"#3E3F78"}
            strokeCap={"round"}
          />
        </Canvas>
      </Pressable>
    </>
  );
}
