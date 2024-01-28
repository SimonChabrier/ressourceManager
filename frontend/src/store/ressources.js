// store/ressources.js

import { defineStore } from 'pinia';
import dataloader from '@/dataloader/users';
import security from '@/dataloader/security';
import ressources from '@/dataloader/ressources';

export const useRessourcesStore = defineStore('ressources', {
   
    state: () => ({
        users: [],
        connectedUser: null,
        ressources: [], 
        ressource: null,
        message: null,
        re: {
          body : 'ma valeur',
        }
    }),

    // les getters sont des fonctions qui permettent d'obtenir des données du store
    getters: {
        getUsers(state) {
            return state.users;
        },
        getConnectedUser(state) {
            return state.connectedUser;
        },
    },

    // les actions sont des fonctions qui permettent de modifier le store
    actions: {
        
        async fetchUsers() {
            try {
                const response = await dataloader.getUsers();
                this.users = response.data;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },

        async login(credentials) {
            try {
              const response = await security.login(credentials);
              this.connectedUser = response.data.user;
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
            try {
              const response = await security.logout();
              this.connectedUser = null;
              return response.data.message;
            } catch (error) {
              console.error('Error logging out:', error);
            }
          },

          async fetchRessources() {
            try {
              const response = await ressources.getRessources();
              this.ressources = response.data.ressources; // prendre la clé ressources du json
              this.message = response.data.message; // prendre la clé message du json
              console.log(this.ressources);
            } catch (error) {
              console.error('Error fetching ressources:', error);
            }
          },

          async fetchRessource(id) {
            try {
              const response = await ressources.getRessource(id);
              this.ressource = response.data.ressource; 
              this.message = response.data.message;
            } catch (error) {
              console.error('Error fetching ressource:', error);
            }
          },

          // créer une ressource createRessource(ressource)
          async createRessource(ressource) {
            try {
              const response = await ressources.createRessource(ressource);
              this.message = response.data.message;
            } catch (error) {
              console.error('Error creating ressource:', error);
            }
          },

          // modifier la ressource updateRessource(id, ressource)
          async updateRessource(id, ressource) {
            try {
              const response = await ressources.updateRessource(id, ressource);
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
          // ajouter une ressource addRessource(ressource)
          // modifier la ressource updateRessource(id, ressource)
    },

});
