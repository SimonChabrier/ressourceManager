<template>
    <nav class="navbar">
      <router-link to="/">Ressources</router-link>
      <router-link to="/ressource">Nouvelle ressource</router-link>
      <router-link :to=linkPath.value>{{ linkText.value }}</router-link>
      <p v-if="username.value">{{ username.value }}</p>
      <p v-if="message.value" class="message">{{ message.value}}</p>
    </nav>
  
  </template>
  
  <script>
  import { onMounted } from 'vue';
  import { useRessourcesStore } from '@/store/ressources';
  import { reactive, watch } from "vue";
  
  export default {
    name: 'NavBar',
    components: {},
    // set up du store
    setup() {
      const ressourcesStore = useRessourcesStore();
      const username = reactive({ value: "" });
      const message = reactive({ value: "" });
      const linkPath = reactive({ value: ""})
      const linkText = reactive({ value: ""})

      // Pour mettre à jour le nom d'utilisateur quand il se connecte dans le store je dois utiliser watch
      watch(() => ressourcesStore.connectedUser, (newVal) => {
          if(newVal) {
            username.value = newVal.email;
          }
        },
        { immediate: true } 
      );

      watch(() => ressourcesStore.linkPath, (newVal) => {
        if(newVal) {
          console.log(newVal);
          linkPath.value = newVal;
        }
      },
        { immediate: true } 
      );

      watch(() => ressourcesStore.linkText, (newVal) => {
          linkText.value = newVal;
        },
        { immediate: true }
      );

      // watch message pour afficher le message d'erreur
      watch(() => ressourcesStore.message, (newVal) => {
          message.value = newVal;
        },
        { immediate: true }
      );

      onMounted(async () => {
        //
      });

      return { username, message, linkPath, linkText };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .navbar {
    text-align: right;
    padding: $padding $padding-small;
  }

  .message {
    color: $color-success;
  }
  </style>
  