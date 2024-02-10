<template>
    <div class="login_form">    
        <form @submit.prevent="login">
        <input v-model="username" type="text" placeholder="Username" autocomplete="username"/>
        <input v-model="password" type="password" placeholder="Password" autocomplete="current-password" />
        <input type="submit" value="Login" />
        </form>
        <div id="errors" style="color: red;"></div>
    </div>
</template>


<script>

import { useRessourcesStore } from '@/stores/ressources';

export default {
    name: 'LoginForm',

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
                username: "simonchabrier@gmail.com",
                password: "password"

                // username: this.username,
                // password: this.password,
            });
            this.response = response;
        },
    },

    watch: {
        response() {
            if (this.response === 'Authentification réussie') {

                this.$router.go(-1);
            } else {
                document.getElementById('errors').innerHTML = this.response;
            }
        },
    },

};

</script>

<style lang="scss" scoped>
.login_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // height: 100vh;
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        input {
            margin: 10px;
            padding: 10px;
            width: 200px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }
    }
}
</style>    