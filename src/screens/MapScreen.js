import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import api from "../api/api";
import { AntDesign } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import ResultsList from "../components/ResultsList";

const MapScreen = ({ navigation }) => {
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(true);
  const currentPosition = navigation.getParam("currentPosition");
  const restaurants = navigation.getParam("restaurants");

  renderMarkers = () => {
    return restaurants.map(restaurant => (
      <Marker
        key={restaurant.id}
        coordinate={restaurant.coordinates}
        title={restaurant.name}
      />
    ));
  };

  changeBottomBarVisibility = state => {
    setIsBottomBarVisible(state);
  };

  renderBottomBar = () => {
    return (
      <SafeAreaView>
        <View
          style={{
            height: 270,
            width: "100%",
            backgroundColor: "white",
            paddingTop: 15
            //   shadowColor: "#000",
            //   shadowOpacity: 0.55,
            //   shadowRadius: 25,
            //   elevation: 10
          }}
        >
          <ResultsList results={restaurants} title="All" />
        </View>
      </SafeAreaView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        onTouchMove={() => changeBottomBarVisibility(false)}
        onPress={() => changeBottomBarVisibility(true)}
        initialRegion={{
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {renderMarkers()}
      </MapView>
      {renderBottomBar()}

      <SafeAreaView style={{ position: "absolute" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}
          style={{ position: "absolute", marginLeft: 20, marginTop: 40 }}
        >
          <AntDesign size={25} name="close" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MapScreen;
