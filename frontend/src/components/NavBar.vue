<template>
    <nav class="navbar">
      <router-link to="/">Ressources</router-link>
      <router-link to="/login">Login</router-link>
      <router-link @click="logout" to="/">Logout</router-link>
      <p v-for="user in users" :key="user.id">{{ user.firstName }} {{ user.lastName }}</p>
    </nav>
  
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRessourcesStore } from '@/store/ressources';
  
  export default {
    name: 'NavBar',
    components: {},
    // set up du store
    setup() {
      const ressourcesStore = useRessourcesStore();
      const users = ref([]);

      onMounted(async () => {
        await ressourcesStore.fetchUsers();
        users.value = ressourcesStore.getUsers;
      });

    return { users };

    },

    methods: {
      async logout() {
        await this.ressourcesStore.logout();
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .navbar {
    text-align: right;
    padding: $padding $padding-small;
  }
  </style>
  