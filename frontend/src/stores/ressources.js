import { defineStore } from 'pinia';
import security from '@/dataloader/security';
import ressources from '@/dataloader/ressources';
import tokenManager from '@/security/tokenManager';

// defineStore prend un nom et un objet avec des fonctions pour définir le store
export const ressourcesStore = defineStore('ressources', {
   
    state: () => ({
        connectedUser: null,
        ressources: [], 
        message: null,
        linkPath: '/login',
        linkIcon: 'sign-in-alt',
        linkText: 'Login',
        isloading: true,
    }),

    // les getters sont des fonctions qui permettent d'obtenir des données du store
    // c'est l'équivalent des computed properties dans les composants
    // on peut les utiliser pour filtrer, trier ou formater les données du store avant de les afficher
    getters: {
        getConnectedUser(state) {
          console.log('getters getConnectedUser', state.connectedUser);
            return state.connectedUser;
        },
        getUserId(state) {
            return state.connectedUser.id || 'aucun id utilisateur';
        },
        getLoading(state) {
          return state.isloading;
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
                this.linkPath = "/logout"
                this.linkText = "Logout"
                this.linkIcon = "sign-out-alt"
                this.message = response.data.message;
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
              tokenManager.removeToken();
              
              this.message = response.data.message;
              this.connectedUser = null;  
              this.linkPath = "/login"
              this.linkText = "Login"
              this.linkIcon = "sign-in-alt"

              return response.data.message;
            } catch (error) {
              console.error('Error logging out:', error);
            }
          },
          async getRessources(offset, limit) {
            try {
              const response = await ressources.getRessources(offset, limit);
              if(response.data.message == 'Aucune ressource trouvée'){
                this.ressources = [];
                this.message = response.data.message;
                // this.isloading = false;
              } else {
                  if(response.data.ressources){ // plusieurs ressources
                    this.ressources = response.data.ressources;
                    this.message =  response.data.ressources.length + ' - ' + response.data.message; // prendre la clé message du json
                    // this.isloading = false;
                  } else { // une seule ressource
                    this.ressources = response.data.ressource; 
                    this.message =  response.data.ressource.length + ' - ' + response.data.message; // prendre la clé message du json
                    // this.isloading = false;
                  }
              }
            } catch (error) {
              this.message = error.message;
              console.error('Error fetching ressources:', error);
            }
          },
          async getRessource(id) {
            try {
              const response = await ressources.getRessource(id);
              this.ressource = response.data.ressource; 
              this.message = ' Ressource : ' + response.data.ressource.title;
              return response.data.ressource;
            } catch (error) {
              console.error('Error fetching ressource:', error);
            }
          },
          async createRessource(ressource) {
            try {
              const response = await ressources.createRessource(ressource);
              this.message = response.data.message;
              // this.getRessources();
            } catch (error) {
              console.error('Error creating ressource:', error);
            }
          },
          // modifier la ressource patchRessource(id, ressource)
          async patchRessource(ressourceId, ressource) {
            try {
              const response = await ressources.patchRessource(ressourceId, ressource);
              this.message = response.data.message;
              this.getRessources();
            } catch (error) {
              console.error('Error updating ressource:', error);
            }
          },
          // suprimer la ressource deleteRessource(id)
          async deleteRessource(id) {
            if (!confirm('Voulez-vous vraiment supprimer cette ressource ?')) {
              return;
            }
            try {
              const response = await ressources.deleteRessource(id);
              this.message = response.data.message;
              // recharger la liste des ressources
              this.getRessources();
            } catch (error) {
              console.error('Error deleting ressource:', error);
            }
          },
    },

    computed: {
      linkText() {
          return this.connectedUser ? 'Logout' : 'Login';
      },
  },

});
