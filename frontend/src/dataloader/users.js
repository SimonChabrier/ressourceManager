// chargé des requêtes vers le backend avec axios

import axios from 'axios'

const apiClient = axios.create({
    baseURL: `http://localhost:3000/api`,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
})

export default {

    // utilisateurs
    getUsers () {
        return apiClient.get('/users')
    },
    getUser(id) {
        return apiClient.get('/users/' + id)
    },
    createUser(user) {
        return apiClient.post('/users', user)
    },
    updateUser(user) {
        return apiClient.put('/users/' + user._id, user)
    },
    deleteUser(id) {
        return apiClient.delete('/users/' + id)
    },
}