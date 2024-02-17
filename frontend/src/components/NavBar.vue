<template>
  <section class="top-nav">
   
    <div>
      <ul class="menu">
        <li v-if="username.value"><font-awesome-icon :icon="['fas', 'user']" />&nbsp;&nbsp;{{ username.value }}</li> 
        <li v-else><font-awesome-icon :icon="['fas', 'user-slash']" /></li>
        <li v-if="message.value" class="message">{{ message.value}}</li>
      </ul>
    </div>

    <input id="menu-toggle" type="checkbox" />
    <label class='menu-button-container' for="menu-toggle">
      <div class='menu-button'></div>
    </label>
    
    <ul class="menu">
      <li><router-link :to="{ name: 'ressources', query: { offset: 0, limit: 28 } }"><font-awesome-icon :icon="['fas', 'house']" title="retour aux ressource"/></router-link></li>
      <li><router-link to="/ressource"><font-awesome-icon :icon="['fas', 'plus']" title="créer une ressource"/></router-link></li>
      <li><router-link :to=linkPath.value><font-awesome-icon :icon="linkIcon.value" :title="linkText.value"/></router-link></li>
    </ul>

  </section>
</template>



<script>
import { ressourcesStore } from '@/stores/ressources';
import { ref, reactive, watch } from "vue";

export default {
  name: 'NavBar',
  setup() {
    const store = ressourcesStore();
    const username = reactive({ value: "" });
    const message = reactive({ value: "" });
    const linkPath = reactive({ value: "" })
    const linkText = reactive({ value: "" })
    const linkIcon = reactive({ value: "" })
    const isMenuOpen = ref(false);

    // Fonction pour basculer l'état du menu
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    watch(() => store.connectedUser, (newVal) => {
      if(newVal) {
        username.value = newVal.username;
      }
    }, { immediate: true });

    watch(() => store.message, (newVal) => {
      message.value = newVal;
    }, { immediate: true });

    watch(() => store.linkPath, (newVal) => {
      if(newVal) {
        linkPath.value = newVal;
      }
    }, { immediate: true });

    watch(() => store.linkText, (newVal) => {
      linkText.value = newVal;
    }, { immediate: true });

    watch(() => store.linkIcon, (newVal) => {
      linkIcon.value = newVal;
    }, { immediate: true });

    return { username, message, linkPath, linkText, isMenuOpen, toggleMenu, linkIcon};
  },
};
</script>

<style lang="scss" scoped>

.top-nav {
  display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #497683;
    color: #FFF;
    height: 50px;
    padding: 1em;
}

.menu {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.menu > li {
  margin: 0 1rem;
  overflow: hidden;
}

.menu a {
  color: #FFF!important;
  text-decoration: none;
}

.menu-button-container {
  display: none;
  height: 100%;
  width: 30px;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#menu-toggle {
  display: none;
}

.menu-button,
.menu-button::before,
.menu-button::after {
  z-index: 2;
  display: block;
  background-color: #fff;
  position: absolute;
  height: 4px;
  width: 30px;
  transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
  border-radius: 2px;
}

.menu-button::before {
  content: '';
  margin-top: -8px;
}

.menu-button::after {
  content: '';
  margin-top: 8px;
}

#menu-toggle:checked + .menu-button-container .menu-button::before {
  margin-top: 0px;
  transform: rotate(405deg);
}

#menu-toggle:checked + .menu-button-container .menu-button {
  background: rgba(255, 255, 255, 0);
}

#menu-toggle:checked + .menu-button-container .menu-button::after {
  margin-top: 0px;
  transform: rotate(-405deg);
}

@media (max-width: 700px) {
  .menu-button-container {
    display: flex;
  }
  .menu {
    position: absolute;
    top: 0;
    // margin-top: 50px;
    left: 0;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  #menu-toggle ~ .menu li {
    height: 0;
    margin: 0;
    padding: 0;
    border: 0;
    transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  #menu-toggle:checked ~ .menu li {
    border: 1px solid #668f9a;
    height: 2.5em;
    padding: 0.5em;
    transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  .menu > li {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0.5em 0;
    width: 100%;
    color: white;
    background-color: #497683;
  }
  .menu > li:not(:last-child) {
    border-bottom: 1px solid #375962;
  }
}
</style>
