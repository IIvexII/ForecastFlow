import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// icons
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackScreenProps<RootStackParamList>["navigation"]>();

  return (
    <View style={[styles.flexRow, styles.mainContainer, { marginTop: top + 20 }]}>
      <View style={[styles.flexRow]}>
        {/* back button */}
        <Pressable style={[styles.flexRow]} onPress={() => navigation.goBack()} hitSlop={20}>
          <Entypo name="chevron-left" size={36} color="white" />
          {/* title */}
          <Text style={[styles.headerText]}>{title}</Text>
        </Pressable>
      </View>

      {/* menu icon */}
      <MaterialCommunityIcons name="dots-vertical-circle-outline" size={30} color="white" />
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  headerText: {
    marginLeft: 10,
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
