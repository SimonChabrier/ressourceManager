// // chargé des requêtes vers le backend avec axios

// import axios from 'axios'
// import tokenManager from '@/security/tokenManager'

// const apiClient = axios.create({
//     baseURL: `http://localhost:3000/api`,
//     withCredentials: true, // pour envoyer le cookie de session au backend
//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + tokenManager.getToken(),
//     },
// })

// export default {

//     // utilisateurs
//     getRessources () {
//         return apiClient.get('/ressources')
//     },
//     getRessource(id) {
//         return apiClient.get('/ressources/' + id)
//     },
//     createRessource(ressource) {
//         return apiClient.post('/ressources', ressource)
//     },
//     patchRessource(ressourceId, ressource) {
//         return apiClient.patch('/ressources/' + ressourceId, ressource)
//     },
//     deleteRessource(id) {
//         return apiClient.delete('/ressources/' + id)
//     },
// }

import axios from 'axios';
import tokenManager from '../security/tokenManager';

const apiClient = axios.create({
    baseURL: `http://localhost:3000/api`,
    withCredentials: true, // pour envoyer le cookie de session au backend
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour ajouter à la fois le cookie de session et le token à chaque requête sortante
apiClient.interceptors.request.use(config => {
    const token = tokenManager.getToken(); // Récupère le token JWT ou le cookie de session
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default {
    // utilisateurs
    getRessources() {
        return apiClient.get('/ressources');
    },
    getRessource(id) {
        return apiClient.get('/ressources/' + id);
    },
    createRessource(ressource) {
        return apiClient.post('/ressources', ressource);
    },
    patchRessource(ressourceId, ressource) {
        return apiClient.patch('/ressources/' + ressourceId, ressource);
    },
    deleteRessource(id) {
        return apiClient.delete('/ressources/' + id);
    },
};
