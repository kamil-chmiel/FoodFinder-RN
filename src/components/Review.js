import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import Moment from "moment";

const Review = ({ reviewData }) => {
  const [isExtended, setIsExtended] = useState(false);

  prepareContent = text => {
    console.log(text);
    if (text.length > 100 && !isExtended) {
      return (
        <View>
          <Text style={styles.contentStyle}>{text.substring(0, 99)}...</Text>
          <TouchableOpacity onPress={() => setIsExtended(true)}>
            <Text style={styles.moreLabelStyle}>Read more</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return <Text style={styles.contentStyle}>{text}</Text>;
    }
  };

  return (
    <View style={styles.viewStyle}>
      <View style={styles.containerStyle}>
        <Image
          style={styles.imageStyle}
          source={{ uri: reviewData.user.image_url }}
        ></Image>
        <View>
          <Text style={styles.nameStyle}>{reviewData.user.name}</Text>
          <Text style={styles.dateStyle}>{reviewData.time_created}</Text>
        </View>
      </View>
      {prepareContent(reviewData.text)}
      <View style={styles.separatorStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    marginLeft: 20,
    marginRight: 20
  },
  containerStyle: {
    flexDirection: "row",
    marginBottom: 10
  },
  imageStyle: {
    height: 45,
    width: 45,
    borderRadius: 22,
    marginRight: 15
  },
  iconStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "gray",
    marginHorizontal: 15
  },
  separatorStyle: {
    marginTop: 20,
    marginBottom: 20,
    height: 1,
    backgroundColor: "#D8D8D8"
  },
  nameStyle: {
    fontWeight: "bold",
    fontSize: 16
  },
  dateStyle: {
    color: "gray",
    fontSize: 13
  },
  contentStyle: {
    fontSize: 16
  },
  moreLabelStyle: {
    color: "#ac8daf",
    fontSize: 16,
    marginTop: 2,
    textDecorationLine: "underline"
  }
});

export default Review;
