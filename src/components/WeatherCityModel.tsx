import React, { useEffect, useMemo, useState } from "react";
import { Modal, View, Text, TextInput, FlatList, TouchableOpacity, Dimensions } from "react-native";

import useDebounce from "../hooks/useDebounce";
import { searchCity } from "../services/weatherService";

const { width } = Dimensions.get("window");

type WeatherCityModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onSelected: (city: string) => void;
};

const WeatherCityModal: React.FC<WeatherCityModalProps> = ({ modalVisible, setModalVisible, onSelected }) => {
  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [cities, setCities] = useState<Array<{ city: string; country: string }>>([]);

  // Filter cities based on search query
  const suggestions = useMemo(
    () =>
      cities.filter(
        (city) =>
          city.city.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          city.country.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      ),
    [debouncedSearchQuery, cities]
  );

  useEffect(() => {
    if (debouncedSearchQuery.length > 3) {
      // Fetch cities from an API or local storage
      searchCity(debouncedSearchQuery).then((data) => setCities(data));
    }
  }, [debouncedSearchQuery]);

  // Handle city selection
  const handleSelectCity = (city: string) => {
    setModalVisible(false);
    onSelected(city);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.1)", // Semi-transparent overlay
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: width - 40, // Nearly full width with margins
            backgroundColor: "#58009B", // Purple theme
            borderRadius: 16,
            paddingVertical: 30,
            paddingHorizontal: 40,
            elevation: 5, // Android shadow
            shadowColor: "#000", // iOS shadow
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
        >
          <View style={{ position: "relative", alignItems: "center", marginBottom: 20 }}>
            <Text style={{ color: "white", fontSize: 24, textAlign: "center" }}>Choose City</Text>
            <TouchableOpacity
              style={{ position: "absolute", top: 0, right: 0 }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "white", fontSize: 18 }}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Search field */}
          <TextInput
            style={{
              backgroundColor: "white",
              color: "black",
              padding: 10,
              borderRadius: 5,
              marginBottom: 10,
            }}
            placeholder="Search for a city"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* Suggestions list or no-results message */}
          {debouncedSearchQuery.length > 3 ? (
            suggestions.length > 0 ? (
              <FlatList
                data={suggestions}
                keyExtractor={(item) => item.city}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelectCity(item.city)}
                    style={{
                      padding: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: "rgba(255,255,255,0.2)", // Subtle separator
                    }}
                  >
                    <Text style={{ color: "white" }}>
                      {item.city}, {item.country}
                    </Text>
                  </TouchableOpacity>
                )}
                style={{ maxHeight: 150 }} // Scrollable if needed
              />
            ) : (
              <Text style={{ color: "white", textAlign: "center", marginTop: 10 }}>No cities found</Text>
            )
          ) : (
            <Text style={{ color: "white", textAlign: "center", marginTop: 10 }}>
              Type at least 4 characters
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default WeatherCityModal;
