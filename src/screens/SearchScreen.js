import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native'
import SearchBar from '../components/SearchBar'
import api from '../api/api'
import useResults from '../hooks/useResults'
import ResultsList from '../components/ResultsList'

const SearchScreen = () => {
    const [term, setTerm] = useState('')
    const [searchApi, results] = useResults()
    
    const filterResultsByPrice = (price) => {
        return results.filter(result => {
            return result.price === price
        })
    }

    const renderResultView = () => {
        if(!results.length) {
            return(
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.emptyLabelStyle}>
                            No recent search results
                        </Text>
                        <Text style={styles.descriptionStyle}>
                            Your search results will appear here.
                        </Text>
                </View>
            )
        } else {
            return(
                <ScrollView>
                    <ResultsList results={filterResultsByPrice('$')} title='Cost Effective' />
                    <ResultsList results={filterResultsByPrice('$$')} title='Bit Pricier'/>
                    <ResultsList results={filterResultsByPrice('$$$')} title='Big Spender'/>
                </ScrollView>
            )
        }
    }

    return (
        <>
            <SearchBar 
                term={term} 
                onTermChange={setTerm}
                onTermSubmit={() => searchApi(term)}
            />
            {renderResultView()}
            
        </>
    )
}

const styles = StyleSheet.create({
    emptyLabelStyle: {
        fontSize: 18,
        marginBottom: 7,
        fontWeight: 'bold',
        color: 'gray'
    },
    descriptionStyle: {
        fontSize: 15,
        color: 'gray'
    }
})

export default SearchScreen