<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import BannerComponent from './components/Banner.vue'
</script>

<template>  
  <div>
      <NavBar></NavBar>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    <BannerComponent text="© 2024 - Tous droits réservés" color="success" />
  </div>
</template>


<style lang="scss" scoped>
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

