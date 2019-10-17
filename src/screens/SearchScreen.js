import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
  SafeAreaView
} from "react-native";
import SearchBar from "../components/SearchBar";
import api from "../api/api";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { DotsLoader } from "react-native-indicator";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [searching, setSearching] = useState(true);
  const [searchApi, results] = useResults();

  useEffect(() => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }, []);

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
    } else {
      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      searchApi("food", latitude, longitude, () => {
        setSearching(false);
      });
    }
  };

  const filterResultsByPrice = price => {
    return results.filter(result => {
      return result.price === price;
    });
  };

  const renderResultView = () => {
    if (!results.length) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={styles.emptyLabelStyle}>No search results</Text>
          <Text style={styles.descriptionStyle}>
            Your search results will appear here.
          </Text>
        </View>
      );
    } else {
      return (
        <ScrollView>
          <ResultsList
            results={filterResultsByPrice("$")}
            title="Cost Effective"
          />
          <ResultsList
            results={filterResultsByPrice("$$")}
            title="Bit Pricier"
          />
          <ResultsList
            results={filterResultsByPrice("$$$")}
            title="Big Spender"
          />
        </ScrollView>
      );
    }
  };

  const renderLoadingPanel = () => {
    if (searching) {
      return (
        <View
          style={{
            backgroundColor: "rgba(52, 52, 52, 0.2)",
            position: "absolute",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View style={styles.loadingPanelStyle}>
            <DotsLoader color={"ac8daf"} />
          </View>
        </View>
      );
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <SearchBar
          term={term}
          onTermChange={setTerm}
          onTermSubmit={() => searchApi(term, latitude, longitude)}
        />
        {renderResultView()}
      </SafeAreaView>
      {renderLoadingPanel()}
    </>
  );
};

const styles = StyleSheet.create({
  emptyLabelStyle: {
    fontSize: 18,
    marginBottom: 7,
    fontWeight: "bold",
    color: "gray"
  },
  descriptionStyle: {
    fontSize: 15,
    color: "gray"
  },
  loadingPanelStyle: {
    backgroundColor: "white",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: 75,
    width: 75,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10
  }
});

export default SearchScreen;
