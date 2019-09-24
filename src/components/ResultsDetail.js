import React, { useEffect } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'

const ResultsDetail = ({ result, navigation }) => {

    return (
        <View style={styles.containerStyle}>
            <Image 
                style={styles.imageStyle} 
                source={{ uri: result.image_url}}
            >
            </Image>
            <Text>
                {result.rating} Stars, {result.review_count}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        marginLeft: 15
    },
    imageStyle: {
        height: 120,
        width: 250,
        borderRadius: 4,
        marginBottom: 5
    },
    nameStyle: {
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5
    }
})

export default withNavigation(ResultsDetail)