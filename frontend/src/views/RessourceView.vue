<template>
    <section class="ressource_container">
      <h1>{{ ressource.title }}</h1>
      <p v-html="ressource.content"></p>
        <div class="ressource_links">
          <p><router-link :to="{ name: 'ressources' }">Retour aux ressources</router-link></p>
          <p><router-link :to="{ name: 'ressource-delete', params: { id: ressource.id } }">Supprimer</router-link></p>
        </div>
      <SpinerComponent text="loading"></SpinerComponent>
      </section>
</template>

<script>
import { useRessourcesStore } from '@/stores/ressources';
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
    const ressourcesStore = useRessourcesStore();
    const ressource = ref('');
    const message = ref('');

    //* utiliser les rférences ici pour récupérer les données du store
    onMounted(async () => {
      const id = router.currentRoute.value.params.id;
      await ressourcesStore.getRessource(id);
      // Affectez les valeurs du store aux références locales (on utilise plus this avec Vue 3)
      ressource.value = ressourcesStore.ressource;
      message.value = ressourcesStore.message;      
    });

    return {
      ressource,
      message,
    };
  },
  
};
</script>

<style lang = "scss" scoped>
</style>
