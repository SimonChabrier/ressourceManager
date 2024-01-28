<template>
  <div class="appContainer">
    <div class="appHeader">
      <NavBar></NavBar>
    </div>
    
    <div class="mainContainer">
      <!-- Si j'ai un utilisateur connecté, j'affiche son nom -->
      <div v-if="ressourcesStore.connectedUser">
        <h5>Bonjour {{ ressourcesStore.connectedUser }}</h5>
      </div>
      
      <SearchResult></SearchResult>

      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>

    </div>

    <div class="appFooter">
      <FooterComp></FooterComp>
    </div>
    
    <BannerComponent text="© 2024 - Tous droits réservés" color="success" />
  </div>
</template>

<script>
import BannerComponent from "@/components/Banner.vue";
import NavBar from "@/components/NavBar.vue";
import { useRessourcesStore } from "@/store/ressources";
import { reactive, watch } from "vue";

export default {
  name: "App",

  components: {
    BannerComponent,
    NavBar,
  },

  setup() {
    const ressourcesStore = useRessourcesStore();

    // Utilisez reactive directement
    const username = reactive({ value: "" });

    // Surveillez les changements du store pour mettre à jour 'username'
    watch(
      () => ressourcesStore.connectedUser,
      (newVal) => {
        username.value = newVal;
      },
      { immediate: true } // Pour obtenir la valeur initiale
    );

    return { ressourcesStore, username };
  },
};
</script>

<style lang="scss" scoped>
  .appContainer {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .mainContainer {
      flex: 1;
      overflow-y: auto; /* Si le contenu principal peut dépasser la hauteur de la fenêtre */
      background-color: $color-light;
      padding: $padding $padding-small;
  }

  .appHeader {
    flex: 0 0 auto;
  }

  .appFooter {
    flex: 0 0 auto;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
