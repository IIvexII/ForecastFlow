import React from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useWindowDimensions } from "react-native";
import ForecastSheetBackground from "./ForecastSheetBackground";
import Seperator from "./elements/Seperator";
import ForecastControls from "./elements/ForecastControls";
import ForecastCapsule from "./elements/ForecastCapsule";
import { hourly } from "../../data/ForecastData";
import ForecastCapsuleList from "./elements/ForecastCapsuleList";

export default function ForecastSheet() {
  const { width, height } = useWindowDimensions();
  const snapPoints = ["40%", "90%"];
  const firstSnapPoint = height * (parseFloat(snapPoints[0]) / 100);
  const cornerRadius = 44;

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
        <ForecastControls />
        <Seperator height={5} width={width} />
        <ForecastCapsuleList forecasts={hourly} />
      </BottomSheetView>
    </BottomSheet>
  );
}
