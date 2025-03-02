import * as Location from "expo-location";

export const getLocationPermission = async (): Promise<boolean> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === "granted";
  } catch (error) {
    console.error("Error requesting location permission:", error);
    return false;
  }
};

export const getCurrentLocation = async () => {
  const hasPermission = await getLocationPermission();
  if (!hasPermission) {
    throw new Error("Location permission not granted");
  }

  try {
    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.LocationAccuracy.Highest,
    });
    const location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    return location;
  } catch (error) {
    console.error("Error getting current location:", error);
    throw error;
  }
};
