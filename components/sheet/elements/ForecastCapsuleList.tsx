import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import ForecastCapsule from "./ForecastCapsule";
import { Forecast, ForecastType } from "../../../models/Weather";

type ForecastCapsuleListProps = {
  type: ForecastType;
  forecasts: Forecast[];
};

export default function ForecastCapsuleList(props: ForecastCapsuleListProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View
        style={{
          paddingLeft: 20,
          paddingTop: 20,
          paddingRight: 20,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          gap: 10,
        }}
      >
        {props.forecasts.map((forecast, index) => (
          <ForecastCapsule type={props.type} forecast={forecast} key={index} />
        ))}
      </View>
    </ScrollView>
  );
}
