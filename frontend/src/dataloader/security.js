// chargé des requ^tes vers le backend avec axios

import axios from 'axios'

const apiClient = axios.create({
    baseURL: `http://localhost:3000/api/`,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

export default {

    // authentification
    login(credentials) {
        return apiClient.post('/login', credentials)
    },
    logout() {
        return apiClient.get('/logout')
    },
    getUserInfo() {
        return apiClient.get('/userinfo')
    },

}