import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons'

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
    return (
        <View style={styles.backgroundStyle}>
            <TextInput 
                style={styles.inputStyle} 
                placeholder='Search for restaurants'
                value={term}
                onChangeText={newTerm => onTermChange(newTerm)}
                onEndEditing={onTermSubmit}
                autoCapitalize='none'
                autoCorrect={false}
            />
            <Feather style={styles.iconStyle} name='search'/>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundStyle: {
        marginTop: 25,
        marginBottom: 25,
        backgroundColor: 'white',
        height: 45,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 10,
        elevation: 10,
    },
    inputStyle: {
        flex: 1,
        marginLeft: 15,
        fontSize: 16
    },
    iconStyle: {
        fontSize: 20,
        alignSelf: 'center',
        marginHorizontal: 15
    }
})

export default SearchBar