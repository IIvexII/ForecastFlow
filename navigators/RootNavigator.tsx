import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import SearchWeather from "../screens/SearchWeather";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={SearchWeather} />
    </Stack.Navigator>
  );
}
