import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import api from '../api/api';

const RestaurantDetailsScreen = ({ navigation}) => {
    const [restaurant, setRestaurant] = useState(null)
    const id = navigation.getParam('id')

    const getRestaurantDetails = async (id) => {
        const response = await api.get(`/${id}`)
        setRestaurant(response.data)
    }

    useEffect(() => {
        getRestaurantDetails(id)
    }, [])

    if (!restaurant) {
        return null
    }
    
    return (
        <View>
            <Text>{restaurant.name}</Text>
            <FlatList
                data={restaurant.photos}
                keyExtractor={(photo) => photo}
                renderItem={({ item }) => {
                    return <Image style={styles.imageStyle} source={{ uri: item}} />
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 200,
        width: 300
    }
})

export default RestaurantDetailsScreen