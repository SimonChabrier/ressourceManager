<template>
  <div>
    <h1>Test View</h1>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.firstName }} {{ user.lastName }}</li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRessourcesStore } from '@/store/ressources';

export default {
  name: 'TestView',

  components: {
    //
  },

  setup() {
    const ressourcesStore = useRessourcesStore();
    const users = ref([]);

    onMounted(async () => {
      await ressourcesStore.fetchUsers();
      users.value = ressourcesStore.getUsers;
    });

    return { users };
  },
};
</script>

<style>
  /* styles ici */
</style>
