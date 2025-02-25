import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { View, Text } from "react-native";

import Widget from "./base/Widget";

type HumidityWidgetProps = {
  humidity: number;
  dewPoint: number;
};

const HumidityWidget: React.FC<HumidityWidgetProps> = ({ humidity, dewPoint }) => {
  return (
    <View style={{ position: "relative", width: "50%" }}>
      <Widget>
        <Widget.Header icon={<Feather name="droplet" />} title="Humidity" />
        <Widget.Body>
          <View style={{ justifyContent: "space-between", height: 85 }}>
            <Text style={{ color: "white", fontFamily: "SF-Semibold", fontSize: 40, lineHeight: 40 }}>
              {humidity}%
            </Text>
            <Text style={{ color: "#B2D3FF", fontFamily: "SF-Regular", fontSize: 12, lineHeight: 12 }}>
              The dew point is {dewPoint} right now
            </Text>
          </View>
        </Widget.Body>
      </Widget>
    </View>
  );
};

export default React.memo(HumidityWidget);
