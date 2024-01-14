<template>
  <div class="mainContent">
    <div class="appHeader">
      <NavBar></NavBar>
    </div>
    <div class="main">
      <!-- Si j'ai un utilisateur connecté, j'affiche son nom -->
      <div v-if="ressourcesStore.connectedUser">
        <h1>Bonjour {{ ressourcesStore.connectedUser }}</h1>
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

  * {
      box-sizing: border-box!important;
      -moz-box-sizing: border-box!important;
      -webkit-box-sizing: border-box!important;
  }
  .mainContent {
    margin: 0 auto;
    background-color: #fff;
    min-height: 100vh;
    flex-direction: column;
    display: flex;
  }
  .appHeader {
    flex: 0 0 auto;
  }
  .main {
    flex: 1 0 auto;
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