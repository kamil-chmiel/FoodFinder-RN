import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import SearchScreen from "./src/screens/SearchScreen";
import RestaurantDetailsScreen from "./src/screens/RestaurantDetailsScreen";
import MapScreen from "./src/screens/MapScreen";
import { fromBottom, fromLeft, zoomIn } from "react-navigation-transitions";

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  if (
    prevScene &&
    prevScene.route.routeName === "Search" &&
    nextScene.route.routeName === "Map"
  ) {
    return fromBottom();
  }
  return fromLeft();
};

const navigator = createStackNavigator(
  {
    Search: SearchScreen,
    RestaurantDetails: RestaurantDetailsScreen,
    Map: MapScreen
  },
  {
    initialRouteName: "Search",
    defaultNavigationOptions: {
      title: "Food Finder",
      header: null
    },
    transitionConfig: nav => handleCustomTransition(nav)
  }
);

export default createAppContainer(navigator);
