import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Share } from 'react-native'
import api from '../api/api'
import ImageSlider from 'react-native-image-slider'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialCommunityIcons, AntDesign, Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'

const RestaurantDetailsScreen = ({ navigation}) => {
    const [restaurant, setRestaurant] = useState(null)
    const id = navigation.getParam('id')
    const { arrowStyle, descriptionContainerStyle, descriptionStyle, descriptionLineStyle, shareStyle } = styles
    const priceDescription = ['Cheap', 'Medium Expensive', 'Expensive', 'Very Expensive']

    const getRestaurantDetails = async (id) => {
        const response = await api.get(`/${id}`)
        setRestaurant(response.data)
    }

    const shareRestaurant = () => {
        Share.share({
          message: 'I\'ve just found this cool restaurant called ' + restaurant.name + ' using FoodFinder app.',
          url: 'http://google.com',
          title: 'What a cool app!'
        }, {
          dialogTitle: 'Share FoodFinder goodness',
          excludedActivityTypes: [
            'com.apple.UIKit.activity.PostToTwitter'
          ]
        })
      }

    useEffect(() => {
        getRestaurantDetails(id)
    }, [])

    if (!restaurant) {
        return null
    }
    
    return (
        <View style={{flex: 1}}>
            <ScrollView>
                <ImageSlider
                    style={{height: 350}}
                    images={restaurant.photos}
                    loopBothSides
                    autoPlayWithInterval={4000}
                />
                <LinearGradient 
                    colors={['rgba(0, 0, 0, 0)', '#000']} 
                    style={{position: 'absolute', marginTop: 230, width: '100%', height: 120}}
                />
                <Text style={{position: 'absolute', marginTop: 270, marginLeft: 15, color: 'white', fontSize: 15, fontWeight: 'bold'}}>{restaurant.categories[0].title}</Text>
                <Text style={{position: 'absolute', marginTop: 290, marginLeft: 15, color: 'white', fontSize: 30, fontWeight: 'bold'}}>{restaurant.name}</Text>
                <View style={descriptionContainerStyle}>
                    <View style={descriptionLineStyle}>
                        <AntDesign style={styles.iconStyle} name='star'/>
                        <Text style={descriptionStyle}>
                            {restaurant.rating}
                        </Text>
                    </View>

                    <View style={descriptionLineStyle}>
                        <MaterialCommunityIcons style={styles.iconStyle} name='map-marker'/>
                        <Text style={descriptionStyle}>
                            {restaurant.location.city}, {restaurant.location.country}
                        </Text>
                    </View>
                    <View style={descriptionLineStyle}>
                        <Entypo style={styles.iconStyle} name='phone'/>
                        <Text style={descriptionStyle}>
                            {restaurant.display_phone}
                        </Text>
                    </View>
                    <View style={descriptionLineStyle}>
                        <FontAwesome style={styles.iconStyle} name='dollar'/>
                        <Text style={descriptionStyle}>
                            {priceDescription[restaurant.price.length-1]}
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={{ position: 'absolute' }} onPress={() => { navigation.pop() }}>
                <Ionicons style={ arrowStyle } name='ios-arrow-back' />
            </TouchableOpacity>
            <TouchableOpacity style={{ position: 'absolute', right: 0}} onPress={shareRestaurant}>
                <Entypo style={styles.shareStyle} name='share-alternative'/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 200,
        width: 300
    },
    customSlide: {
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
    },
    arrowStyle: {
        color: 'white',
        position: 'absolute',
        fontSize: 30,
        marginLeft: 20,
        marginTop: 25
    },
    descriptionContainerStyle: {
        backgroundColor: '#000',
        height: 120
    },
    descriptionLineStyle: {
        flexDirection: 'row', 
        alignItems: 'center',
        height: 25
    },
    descriptionStyle: {
        marginLeft: 9, 
        color: 'white'
    },
    iconStyle: {
        marginLeft: 15,
        fontSize: 15,
        color: 'white'
    },
    shareStyle: {
        marginTop: 25,
        marginRight: 30,
        fontSize: 20,
        color: 'white'
    }
})

export default RestaurantDetailsScreen