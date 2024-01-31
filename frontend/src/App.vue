<template>
  <div class="appContainer">
    <div class="appHeader" id="appHeader">
      <NavBar></NavBar>
    </div>
    
    <div class="mainContainer">
      <!-- Si j'ai un utilisateur connecté, j'affiche son nom -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>

    </div>

    <BannerComponent text="© 2024 - Tous droits réservés" color="success" />
  </div>
</template>

<script setup> // avec setup on peut déclarer des variables et des fonctions sans avoir à les déclarer dans le data() et methods: {}
              // les composants sont plus simples à lire et à maintenir et les imports sont directement accessibles dans le template
              // https://vuejs.org/api/sfc-script-setup.html
  import BannerComponent from "@/components/Banner.vue";
  import NavBar from "@/components/NavBar.vue";
</script>

<style lang="scss" scoped>
  .appContainer {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .mainContainer {
      flex: 1;
      background-color: $color-light;
      padding: $padding-large $padding-xlarge;
      position: relative;
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
