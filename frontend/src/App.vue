<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import BannerComponent from './components/Banner.vue'



</script>

<template>  
  <div>
      <NavBar></NavBar>
      <div class="view_container">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    <BannerComponent text="© 2024 - Ressoursator" color="success" />
  </div>
</template>


<style lang="scss" scoped>

  .view_container {
    padding: 30px;
    margin: 0 auto;
    // border: 1px solid black;
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

