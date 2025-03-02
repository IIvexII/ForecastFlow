import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { View, Text } from "react-native";

import Widget from "./base/Widget";

type RainfallWidgetProps = {
  currentRainfall: number;
  forecastRainfall: number;
};

const RainfallWidget: React.FC<RainfallWidgetProps> = ({ currentRainfall, forecastRainfall }) => {
  return (
    <View style={{ position: "relative", width: "50%" }}>
      <Widget>
        <Widget.Header icon={<Feather name="cloud-rain" />} title="Rainfall" />
        <Widget.Body>
          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: "white", fontFamily: "SF-Semibold", fontSize: 24, lineHeight: 28 }}>
              {currentRainfall} mm
            </Text>
            <Text style={{ color: "#ECECEC", fontFamily: "SF-Semibold", fontSize: 18, lineHeight: 28 }}>
              in last hour
            </Text>
          </View>
          <Text style={{ color: "#B2D3FF", fontFamily: "SF-Regular", fontSize: 12, lineHeight: 12 }}>
            {forecastRainfall}mm in next 24 hours
          </Text>
        </Widget.Body>
      </Widget>
    </View>
  );
};

export default React.memo(RainfallWidget);
