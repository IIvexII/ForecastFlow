import React from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

const Loading: React.FC = () => {
  return (
    <View style={styles.loadingContainer}>
      <Image
        source={require("../assets/splash-icon-dark.png")}
        resizeMode="contain"
        style={styles.loadingImage}
      />
      <ActivityIndicator size={"large"} color={"#C8FAFF"} style={styles.activityIndicator} />
    </View>
  );
};

export default React.memo(Loading);

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    backgroundColor: "#3B1078",
  },
  activityIndicator: {
    marginTop: -70,
  },
  loadingImage: {
    width: 380,
    height: 380,
  },
});
