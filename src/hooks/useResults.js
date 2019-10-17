import { useEffect, useState } from "react";
import { Alert } from "react-native";
import api from "../api/api";

export default () => {
  const [results, setResults] = useState([]);

  const searchApi = async (searchTerm, latitude, longitude, callback) => {
    try {
      const response = await api.get("/search", {
        params: {
          limit: 50,
          term: searchTerm,
          latitude,
          longitude
        }
      });
      setResults(response.data.businesses);
      callback();
    } catch (error) {
      Alert.alert("Error", error);
    }
  };

  return [searchApi, results];
};
