<template>
    <nav class="navbar">
      <router-link to="/">Ressources</router-link>
      <router-link to="/login">Login</router-link>
      <router-link @click="logout" to="/">Logout</router-link>
    </nav>
  </template>
  
  <script>
  import { useRessourcesStore } from '@/store/ressources';
  
  export default {
    name: 'NavBar',
    components: {},
    setup() {
      const ressourcesStore = useRessourcesStore();
      return { ressourcesStore };
    },
    methods: {
      async logout() {
        await this.ressourcesStore.logout();
        this.$router.push('/login');
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    height: 50px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }
  </style>
  