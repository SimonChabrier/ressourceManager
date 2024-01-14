// store/ressources.js

import { defineStore } from 'pinia';
import dataloader from '@/dataloader/users';
import security from '@/dataloader/security';

export const useRessourcesStore = defineStore('ressources', {
   
    state: () => ({
        users: [],
        connectedUser: null,
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
              this.connectedUser = response.data.user.email;
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
          }
    },

});
