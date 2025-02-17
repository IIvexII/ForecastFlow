import React from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DEGREE_SYMBOL } from "../../utils/constants";
import { Weather } from "../../models/Weather";

type WeatherInfoProps = {
  weather: Weather;
};

export default function WeatherInfo(props: WeatherInfoProps) {
  const { top } = useSafeAreaInsets();
  const { city, condition, temperature, high, low } = props.weather;

  return (
    <View className="absolute z-[1] w-full items-center justify-center" style={{ top: top + 40 }}>
      <View>
        <Text className="mb-4 font-['SF-Regular'] text-4xl text-white">{city}</Text>
        <Text className="self-center font-['SF-Thin'] text-9xl text-white">
          {temperature}
          {DEGREE_SYMBOL}
        </Text>
        <Text className="mb-2 self-center font-['SF-Semibold'] text-4xl text-white/70">{condition}</Text>
        <View className="flex-row justify-between">
          <Text className="text-2xl text-white">
            H:{high} {DEGREE_SYMBOL}
          </Text>
          <Text className="text-2xl text-white">
            L:{low} {DEGREE_SYMBOL}
          </Text>
        </View>
      </View>
    </View>
  );
}
