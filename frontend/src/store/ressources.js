// store/ressources.js

import { defineStore } from 'pinia';
import security from '@/dataloader/security';
import ressources from '@/dataloader/ressources';
import tokenManager from '@/security/tokenManager';

export const useRessourcesStore = defineStore('ressources', {
   
    state: () => ({

        connectedUser: null,
        ressources: [], 
        ressource: null,
        message: null,
    }),

    // les getters sont des fonctions qui permettent d'obtenir des données du store
    getters: {
        getConnectedUser(state) {
          console.log('getters getConnectedUser', state.connectedUser);
            return state.connectedUser;
        },
        getUserId(state) {
            return state.connectedUser.id || 'aucun id utilisateur';
        }
    },

    // les actions sont des fonctions qui permettent de modifier le store
    actions: {
        async login(credentials) {
            try {
              const response = await security.login(credentials);
              this.connectedUser = response.data.user;
              this.token = response.data.jwt;
              tokenManager.saveToken(response.data.jwt);
              if (response.data.message) {
                return response.data.message;
              }
            } catch (error) {
              if (error.response && error.response.status === 401) {
                return 'Identifiants invalides';
              }
            }
          },
          async logout() {
            console.log('logout store');
            try {
              const response = await security.logout();
              tokenManager.removeToken();
              this.message = response.data.message;
              this.connectedUser = {
                id: null,
                email: null,
              };
              return response.data.message;
            } catch (error) {
              console.error('Error logging out:', error);
            }
          },
          async getRessources() {
            try {
              const response = await ressources.getRessources();
              this.ressources = response.data.ressources; // prendre la clé ressources du json
              this.message = response.data.message; // prendre la clé message du json
              console.log(this.ressources);
            } catch (error) {
              console.error('Error fetching ressources:', error);
            }
          },
          async getRessource(id) {
            try {
              const response = await ressources.getRessource(id);
              this.ressource = response.data.ressource; 
              this.message = response.data.message;
            } catch (error) {
              console.error('Error fetching ressource:', error);
            }
          },
          async createRessource(ressource) {
            try {
              const response = await ressources.createRessource(ressource);
              this.message = response.data.message;
            } catch (error) {
              console.error('Error creating ressource:', error);
            }
          },
          // modifier la ressource patchRessource(id, ressource)
          async patchRessource(ressourceId, ressource) {
            console.log(ressource);
            try {
              const response = await ressources.patchRessource(ressourceId, ressource);
              this.message = response.data.message;
            } catch (error) {
              console.error('Error updating ressource:', error);
            }
          },
          // suprimer la ressource deleteRessource(id)
          async deleteRessource(id) {
            try {
              const response = await ressources.deleteRessource(id);
              this.message = response.data.message;
            } catch (error) {
              console.error('Error deleting ressource:', error);
            }
          },
    },

});
