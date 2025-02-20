import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList, StyleSheet, TextInput, useWindowDimensions, View } from "react-native";
import { Canvas, LinearGradient, RoundedRect, Shadow, vec } from "@shopify/react-native-skia";

import Header from "../components/Header";
import WeatherWidget from "../components/widgets/WeatherWidget";
import GradientBackground from "../components/GradientBackground";
import { ForecastList } from "../data/ForecastData";

const SearchWeather = () => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {/* its an absolute background so, will not affect the styling of others */}
      <GradientBackground />

      <Header title="Weather" />

      {/* search bar */}
      <View style={[styles.searchBarContainer]}>
        {/* Backgound Gradient */}
        <Canvas style={[styles.container, styles.searchBarBackground]}>
          <RoundedRect x={0} y={0} width={width - 40} height={40} r={30}>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(width, 40)}
              colors={["rgba(40, 51, 90, 0.26)", "rgba(28, 27,51, 0.26)"]}
            />
            <Shadow dx={6} dy={6} blur={2} color="rgba(0, 0, 0, 1)" inner />
          </RoundedRect>
        </Canvas>

        {/* Search Input */}
        <View style={[styles.searchInputContainer]}>
          <Ionicons name="search" size={24} color="white" style={[styles.searchIcon]} />
          <TextInput
            placeholder="Search for a city"
            placeholderTextColor="#BFBFBF"
            style={[styles.searchInput]}
          />
        </View>
      </View>

      <FlatList
        style={{ paddingTop: 6 }}
        contentContainerStyle={{ gap: 20, paddingBottom: 60 }}
        data={ForecastList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WeatherWidget width={width} forecast={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    position: "relative",
    marginTop: 20,
    paddingBottom: 20,
  },
  searchBarBackground: {
    ...StyleSheet.absoluteFillObject,
    marginHorizontal: 20,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 40,
    marginHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 45,
    color: "white",
  },
  searchIcon: {
    position: "absolute",
    left: 10,
  },
});

export default React.memo(SearchWeather);
