import React from "react";
import { StyleSheet, View } from "react-native";

import Header from "../components/Header";
import GradientBackground from "../components/GradientBackground";

const SearchWeather = () => {
  return (
    <View style={styles.mainContainer}>
      {/* its an absolute background so, will not affect the styling of others */}
      <GradientBackground />

      <Header title="Weather" />
    </View>
  );
};

export default SearchWeather;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
