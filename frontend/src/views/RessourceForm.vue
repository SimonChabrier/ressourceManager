<template>
    <div>
      <!-- Formulaire de création de ressource -->
      <form>
        <input type="text" v-model="title" placeholder="Titre de la ressource" />
        <input type="text" v-model="content" placeholder="Description" />
        <!-- select de tags : doc, tuto, article... -->
        <select v-model="tag">
          <option value="doc">Documentation</option>
          <option value="tuto">Tutoriel</option>
          <option value="article">Article</option>
        </select>
        <!-- select de tech : eg : react, node, express, sequelize, postgresql -->
        <select v-model="tech">
          <option value="react">React</option>
          <option value="node">Node</option>
          <option value="express">Express</option>
          <option value="sequelize">Sequelize</option>
          <option value="postgresql">Postgresql</option>
        </select>
        <button @click="createRessource">Créer</button>
      </form>
    </div>
  </template>
  
  <script>
  import { useRessourcesStore } from '@/store/ressources';
  import router from '@/router';
  
  export default {
    name: 'RessourceForm',
  
    setup() {
      const ressourcesStore = useRessourcesStore();
      if(ressourcesStore.connectedUser === null) {
        router.push({ name: 'login' });
      } else{
        const userId = ressourcesStore.connectedUser.id;
        console.log(userId);
        return { ressourcesStore, userId} 
    }
    },
  
    data() {
      return {
        title: '',
        content: '',
        tag: '',
        tech: '',
      };
    },
  
    methods: {
      async createRessource() {
        const ressource = {
          title: this.title,
          content: this.content,
          tag: this.tag,
          tech: this.tech,
          userId: this.userId,
        };
  
        await this.ressourcesStore.createRessource(ressource);
        router.push({ name: 'ressources' });
      },
    },
  };
  </script>
  
  <style lang = "scss" scoped>
  </style>
  