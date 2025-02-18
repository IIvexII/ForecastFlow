import React, { useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useWindowDimensions, View } from "react-native";
import ForecastSheetBackground from "./ForecastSheetBackground";
import Seperator from "./elements/Seperator";
import ForecastControls from "./elements/ForecastControls";
import { hourly, weekly } from "../../data/ForecastData";
import ForecastCapsuleList from "./elements/ForecastCapsuleList";
import { ForecastType } from "../../models/Weather";
import AirQualityWidget from "../widgets/AirQualityWidget";

export default function ForecastSheet() {
  const { width, height } = useWindowDimensions();
  const [forecastType, setForecastType] = useState<ForecastType>(ForecastType.Hourly);

  // Bottom Sheet Configs
  const snapPoints = ["40%", "90%"];
  const firstSnapPoint = height * (parseFloat(snapPoints[0]) / 100);
  const cornerRadius = 44;

  // forecast data
  const forecasts = forecastType === ForecastType.Hourly ? hourly : weekly;
  return (
    <BottomSheet
      snapPoints={snapPoints}
      index={1}
      handleIndicatorStyle={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      containerStyle={{ zIndex: 1 }}
      backgroundComponent={() => (
        <ForecastSheetBackground width={width} height={firstSnapPoint} cornerRadius={cornerRadius} />
      )}
    >
      <BottomSheetView>
        <ForecastControls selected={forecastType} onChange={setForecastType} />
        <Seperator height={5} width={width} />
        <ForecastCapsuleList type={forecastType} forecasts={forecasts} />

        <View style={{ flex: 1, marginTop: 50, paddingHorizontal: 30 }}>
          <AirQualityWidget airQualityIndex={600} />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}
