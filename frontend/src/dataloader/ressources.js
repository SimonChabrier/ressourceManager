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
    getRessources () {
        return apiClient.get('/ressources')
    },
    getRessource(id) {
        return apiClient.get('/ressources/' + id)
    },
    createRessource(ressource) {
        return apiClient.post('/ressources', ressource)
    },
    patchRessource(ressourceId, ressource) {
        return apiClient.patch('/ressources/' + ressourceId, ressource)
    },
    deleteRessource(id) {
        return apiClient.delete('/ressources/' + id)
    },
}