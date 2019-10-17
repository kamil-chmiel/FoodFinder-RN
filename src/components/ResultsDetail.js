import React, { useEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import StarRating from "react-native-star-rating";

const ResultsDetail = ({ result, navigation }) => {
  return (
    <View style={styles.containerStyle}>
      <Image
        style={styles.imageStyle}
        source={{ uri: result.image_url }}
      ></Image>
      <Text style={styles.locationStyle}>{result.location.city}</Text>
      <Text style={styles.nameStyle}>{result.name}</Text>
      <View style={{ flexDirection: "row" }}>
        <StarRating
          fullStarColor="#ac8daf"
          emptyStarColor="#ac8daf"
          starSize={15}
          disabled={false}
          maxStars={5}
          rating={result.rating}
        />
        <Text style={{ marginLeft: 5, color: "gray" }}>
          {result.review_count}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginLeft: 15
  },
  imageStyle: {
    height: 120,
    width: 250,
    borderRadius: 4,
    marginBottom: 2
  },
  nameStyle: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 15
  },
  locationStyle: {
    color: "#484c7f",
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
    fontSize: 12
  }
});

export default withNavigation(ResultsDetail);
