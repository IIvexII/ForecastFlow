import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";

import Home from "../screens/Home";
import SearchWeather from "../screens/SearchWeather";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const screenOpts: StackNavigationOptions = {
    freezeOnBlur: true,
  };
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, detachPreviousScreen: false }}>
      <Stack.Screen name="Home" component={Home} options={screenOpts} />
      <Stack.Screen name="Search" component={SearchWeather} options={screenOpts} />
    </Stack.Navigator>
  );
}
