import React from "react";
import ForecastCapsule from "./ForecastCapsule";
import { Forecast } from "../../../models/Weather";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type ForecastCapsuleListProps = {
  forecasts: Forecast[];
};
export default function ForecastCapsuleList(props: ForecastCapsuleListProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View
        style={{
          paddingLeft: 20,
          paddingTop: 20,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          gap: 10,
        }}
      >
        {props.forecasts.map((forecast, index) => (
          <ForecastCapsule forecast={forecast} key={index} />
        ))}
      </View>
    </ScrollView>
  );
}
