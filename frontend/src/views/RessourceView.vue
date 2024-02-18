<template>
    <section v-if="ressource" class="ressource_container">
      <h1>{{ ressource.title }}</h1>
      <p v-html="ressource.content"></p>
        <div class="ressource_links">
          <p><router-link :to="{ name: 'ressource-view', params: { id: ressource.id } }"><font-awesome-icon :icon="['fas', 'eye']" /></router-link></p>
          <p><router-link :to="{ name: 'ressource-edit', params: { id: ressource.id } }"><font-awesome-icon :icon="['fas', 'pen-to-square']" /></router-link></p>
          <p><router-link :to="{ name: 'ressource-delete', params: { id: ressource.id } }"><font-awesome-icon :icon="['fas', 'trash']" /></router-link></p >
        </div>
      
      </section>
    <section v-else class="loading">
      <SpinerComponent text="loading"></SpinerComponent>
    </section>
</template>

<script>
import { ressourcesStore } from '@/stores/ressources';
import { onMounted, ref } from 'vue';
import SpinerComponent from '@/components/Spiner.vue';
import router from '@/router';


export default {
  components: { 
    SpinerComponent 
  },
  name: 'RessourceView',

  setup() {
    //* déclarer toutes les reférences au store ici
    const store = ressourcesStore();
    const ressource = ref('');
    const message = ref('');

    //* utiliser les rférences ici pour récupérer les données du store
    onMounted(async () => {
      const id = router.currentRoute.value.params.id;
      await store.getRessource(id);
      // Affectez les valeurs du store aux références locales (on utilise plus this avec Vue 3)
      ressource.value = store.ressource;
      message.value = store.message;      
    });

    return {
      ressource,
      message,
    };
  },
  
};
</script>

<style lang = "scss">
</style>
