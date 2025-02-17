import React from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Text, useWindowDimensions } from "react-native";
import ForecastSheetBackground from "./ForecastSheetBackground";

export default function ForecastSheet() {
  const { width, height } = useWindowDimensions();
  const snapPoints = ["28%", "90%"];
  const firstSnapPoint = height * (parseFloat(snapPoints[0]) / 100);
  const cornerRadius = 44;

  return (
    <BottomSheet
      snapPoints={["28%", "90%"]}
      index={1}
      handleIndicatorStyle={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      containerStyle={{ zIndex: 1 }}
      backgroundComponent={() => (
        <ForecastSheetBackground width={width} height={firstSnapPoint} cornerRadius={cornerRadius} />
      )}
    >
      <BottomSheetView className="bg-red-500">
        <Text>Sheet Content</Text>
      </BottomSheetView>
    </BottomSheet>
  );
}
