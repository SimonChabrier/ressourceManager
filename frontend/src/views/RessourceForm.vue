<template>
    <div>
      <!-- Formulaire de création de ressource -->
      <form class="resource-form">
        <div class="form-group">
          <label for="title">Titre de la ressource</label>
          <input type="text" v-model="title" id="title" placeholder="Saisissez le titre" />
        </div>
  
        <div class="form-group">
          <label for="textArea">Description</label>
          <textarea v-model="content" id="textArea" placeholder="Saisissez la description"></textarea>
        </div>
  
        <div class="form-group">
          <label for="tag">Tag</label>
          <select v-model="tag" id="tag">
            <!-- valeur par défaut placeholder -->
            <option value="" disabled selected hidden>Choisir un tag</option>
            <option value="doc">Documentation</option>
            <option value="tuto">Tutoriel</option>
            <option value="article">Article</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="tech">Technologie</label>
          <select v-model="tech" id="tech">
            <!-- valeur par défaut placeholder -->
            <option value="" disabled selected hidden>Choisir une technologie</option>
            <option value="html">HTML</option>
            <option value="node">Node</option>
            <option value="express">Express</option>
            <option value="sequelize">Sequelize</option>
            <option value="vue">Vue</option>
            <option value="sql">SQL</option>
            <option value="javascript">Javascript</option>
            <option value="css">CSS</option>
            <option value="git">Git</option>
            <option value="ubuntu">Ubuntu</option>
          </select>
        </div>
  
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
      if (ressourcesStore.connectedUser === null) {
        router.push({ name: 'login' });
      } else {
        const userId = ressourcesStore.connectedUser.id;
        console.log(userId);
        return { ressourcesStore, userId };
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
  
  <style lang="scss" scoped>
  .resource-form {
    max-width: 90%;
    margin: auto;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input,
  textarea,
  select {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  textarea {
    height: 400px;
  }
  
  button {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  