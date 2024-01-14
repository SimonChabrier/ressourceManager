<template>
    <div class="login">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input v-model="username" type="text" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <input type="submit" value="Login" />
      </form>
      <div id="errors" style="color: red;"></div>
    </div>
  </template>
  
  <script>
  import { useRessourcesStore } from '@/store/ressources';
  
  export default {
    name: 'LogIn',
  
    data() {
      return {
        username: '',
        password: '',
        response: '',
      };
    },

    setup() {
        const ressourcesStore = useRessourcesStore();
        return { ressourcesStore };
    },

    methods: {
      async login() {
       const response = await this.ressourcesStore.login({
        //   username: this.username,
        //   password: this.password,
            username: 'simonchabrier@gmail.com',
            password: 'password',
        });
        this.response = response;
      },
    },

    watch: {
      response() {
        if (this.response === 'Authentification réussie') {
          this.$router.push('/');
        } else {
          document.getElementById('errors').innerHTML = this.response;
        }
      },
    },

  };
  </script>
  
  <style lang="scss" scoped>
  .login {
    width: 400px;
    margin: 16px auto;
    font-size: 16px;
    font-family: 'Open Sans', sans-serif;
    border-radius: 8px;
    background-color: #fff;
    padding: 16px;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  }
  
  form {
    display: flex;
    flex-direction: column;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  form input {
    width: 100%;
    padding: 8px;
    margin-bottom: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  </style>
  