<template>
<div class="navContainer" id="navContainer">
    <div class="navbarMessages">
      <p v-if="username.value">{{ username.value }}</p>
      <p v-if="message.value" class="message">{{ message.value}}</p>
    </div>
    <nav class="navbar">
      <p><router-link to="/">Ressources</router-link></p>
      <p><router-link to="/ressource">Nouvelle ressource</router-link></p>
      <p><router-link :to=linkPath.value>{{ linkText.value }}</router-link></p>
    </nav>
</div>

  </template>
  
  <script>
  import { useRessourcesStore } from '@/stores/ressources';
  import { reactive, watch } from "vue";
  
  export default {
    name: 'NavBar',
    components: {},


    setup() {

      const ressourcesStore = useRessourcesStore();
      const username = reactive({ value: "" });
      const message = reactive({ value: "" });
      const linkPath = reactive({ value: ""})
      const linkText = reactive({ value: ""})

      watch(() => ressourcesStore.connectedUser, (newVal) => {
          if(newVal) {
            username.value = newVal.username;
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
      watch(() => ressourcesStore.message, (newVal) => {
          message.value = newVal;
        },
        { immediate: true }
      );

      return { username, message, linkPath, linkText };
    },
  };

  </script>
  
  <style lang="scss" scoped>

  .navContainer{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .navbarMessages {
    display: flex;
    text-transform: capitalize;
  }

  // a du header
.navbar a {
    text-decoration: none;
    color: $color-quaternary;
    margin-right: $margin-small;
    border-radius: $border-radius;
    &:hover {
        color: $color-secondary;
    }
    // active
    &:active {
        color: $color-tertiary;
    }
    // click
    &:focus {
        color: $color-quaternary;
    }
}
  .navbarMessages p {
    margin-right: 8px;
  }
  .navbar {
    display: flex;
    justify-content: flex-end;
    padding: $padding-small 0;
  }
  </style>
  