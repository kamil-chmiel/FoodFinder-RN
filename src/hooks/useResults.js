import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import api from '../api/api'

export default () => {

    const [results, setResults] = useState([])

    const searchApi = async searchTerm => {
        try {
            const response = await api.get('/search', {
                params: {
                    limit: 50,
                    term: searchTerm,
                    location: 'san jose'
                }
            })
            setResults(response.data.businesses)
        } catch (error) {
            Alert.alert('Error', error)
        }
    }

    return [searchApi, results]
}