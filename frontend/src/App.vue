<template>
  <div class="appContainer">
    <div class="appHeader">
      <NavBar></NavBar>
    </div>
    
    <div class="mainContainer">
      <!-- Si j'ai un utilisateur connecté, j'affiche son nom -->

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
// import { useRessourcesStore } from "@/store/ressources";
// import { reactive, watch } from "vue";

export default {
  name: "App",

  components: {
    BannerComponent,
    NavBar,
  },

  // setup() {
  //   // const ressourcesStore = useRessourcesStore();

  // },
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
      overflow-y: auto;
      background-color: $color-light;
      padding: $padding $padding-small;
      position: relative; /* Ajoutez cette ligne pour positionner les pages */
  }

  .appHeader {
    flex: 0 0 auto;
  }

  .appFooter {
    flex: 0 0 auto;
  }

  .fade-enter-active{
    transition : all 0.5s; 
  }
  .fade-leave-active {
    transition : all 0.1s; 
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }




</style>
