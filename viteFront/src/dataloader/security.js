// chargé des requ^tes vers le backend avec axios

import axios from 'axios'


const apiClient = axios.create({
    baseURL: `http://localhost:3000`,
    withCredentials: true, // pour envoyer le cookie de session au backend (ici c'est pas necessaire car on utilise pas de session)
    headers: {
         Accept: 'application/json',
        'Content-Type': 'application/json'
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
    getSessionInfo() {
        return apiClient.get('/userinfo')
    },

}