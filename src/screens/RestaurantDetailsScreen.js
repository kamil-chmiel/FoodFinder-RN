import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Share
} from "react-native";
import api from "../api/api";
import ImageSlider from "react-native-image-slider";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons
} from "@expo/vector-icons";
import { Transition } from "react-navigation-fluid-transitions";
import useResults from "../hooks/useResults";
import Review from "../components/Review";
import StarRating from "react-native-star-rating";
import MapView, { Marker } from "react-native-maps";

const RestaurantDetailsScreen = ({ navigation }) => {
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState(null);
  const id = navigation.getParam("id");
  const {
    arrowStyle,
    descriptionContainerStyle,
    descriptionStyle,
    descriptionLineStyle,
    shareStyle,
    reviewsTitleStyle
  } = styles;
  const priceDescription = [
    "Cheap",
    "Medium Expensive",
    "Expensive",
    "Very Expensive"
  ];

  const getRestaurantDetails = async id => {
    const response = await api.get(`/${id}`);
    setRestaurant(response.data);
  };

  const getRestaurantReviews = async id => {
    const response = await api.get(`/${id}/reviews`);
    setReviews(response.data.reviews);
    console.log(response.data.reviews);
  };

  const shareRestaurant = () => {
    Share.share(
      {
        message:
          "I've just found this cool restaurant called " +
          restaurant.name +
          " using FoodFinder app.",
        url: "http://google.com",
        title: "What a cool app!"
      },
      {
        dialogTitle: "Share FoodFinder goodness",
        excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"]
      }
    );
  };

  useEffect(() => {
    getRestaurantDetails(id);
    getRestaurantReviews(id);
  }, []);

  if (!restaurant) {
    return null;
  }

  const renderReviews = () => {
    if (reviews != null) {
      return (
        <View>
          <Text style={reviewsTitleStyle}>Guests reviews</Text>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 20,
              marginBottom: 30,
              width: 100
            }}
          >
            <StarRating
              fullStarColor="#ac8daf"
              emptyStarColor="#ac8daf"
              starSize={20}
              disabled={false}
              maxStars={5}
              rating={restaurant.rating}
            />
            <Text style={{ marginLeft: 5 }}>({restaurant.review_count})</Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={reviews}
            keyExtractor={reviews => reviews.id}
            renderItem={({ item }) => {
              return <Review reviewData={item} />;
            }}
          />
        </View>
      );
    }
  };

  const renderMap = () => {
    return (
      <View>
        <Text style={reviewsTitleStyle}>Map</Text>
        <MapView
          style={{ width: "100%", height: 200 }}
          scrollEnabled={false}
          initialRegion={{
            latitude: restaurant.coordinates.latitude,
            longitude: restaurant.coordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <Marker
            coordinate={restaurant.coordinates}
            image={require("../assets/restaurant.png")}
          />
        </MapView>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Transition shared="photo">
          <ImageSlider
            style={{ height: 350 }}
            images={restaurant.photos}
            loopBothSides
            autoPlayWithInterval={4000}
          />
        </Transition>
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "#000"]}
          style={{
            position: "absolute",
            marginTop: 230,
            width: "100%",
            height: 120
          }}
        />
        <Text
          style={{
            position: "absolute",
            marginTop: 270,
            marginLeft: 15,
            color: "white",
            fontSize: 15,
            fontWeight: "bold"
          }}
        >
          {restaurant.categories[0].title}
        </Text>
        <Text
          style={{
            position: "absolute",
            marginTop: 290,
            marginLeft: 15,
            color: "white",
            fontSize: 30,
            fontWeight: "bold"
          }}
        >
          {restaurant.name}
        </Text>
        <View style={descriptionContainerStyle}>
          <View style={descriptionLineStyle}>
            <AntDesign style={styles.iconStyle} name="star" />
            <Text style={descriptionStyle}>{restaurant.rating}</Text>
          </View>

          <View style={descriptionLineStyle}>
            <MaterialCommunityIcons
              style={styles.iconStyle}
              name="map-marker"
            />
            <Text style={descriptionStyle}>
              {restaurant.location.city}, {restaurant.location.country}
            </Text>
          </View>
          <View style={descriptionLineStyle}>
            <Entypo style={styles.iconStyle} name="phone" />
            <Text style={descriptionStyle}>{restaurant.display_phone}</Text>
          </View>
          <View style={descriptionLineStyle}>
            <FontAwesome style={styles.iconStyle} name="dollar" />
            <Text style={descriptionStyle}>
              {priceDescription[restaurant.price.length - 1]}
            </Text>
          </View>
        </View>
        {renderMap()}
        {renderReviews()}
      </ScrollView>
      <TouchableOpacity
        style={{ position: "absolute" }}
        onPress={() => {
          navigation.pop();
        }}
      >
        <Ionicons style={arrowStyle} name="ios-arrow-back" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ position: "absolute", right: 0 }}
        onPress={shareRestaurant}
      >
        <Entypo style={styles.shareStyle} name="share-alternative" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 200,
    width: 300
  },
  customSlide: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center"
  },
  arrowStyle: {
    color: "white",
    position: "absolute",
    fontSize: 35,
    marginLeft: 20,
    marginTop: 35
  },
  descriptionContainerStyle: {
    backgroundColor: "#000",
    height: 120
  },
  descriptionLineStyle: {
    flexDirection: "row",
    alignItems: "center",
    height: 25
  },
  descriptionStyle: {
    marginLeft: 9,
    color: "white"
  },
  iconStyle: {
    marginLeft: 15,
    fontSize: 15,
    color: "white"
  },
  shareStyle: {
    marginTop: 35,
    marginRight: 30,
    fontSize: 20,
    color: "white"
  },
  reviewsTitleStyle: {
    marginLeft: 20,
    marginTop: 35,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 24
  }
});

export default RestaurantDetailsScreen;
