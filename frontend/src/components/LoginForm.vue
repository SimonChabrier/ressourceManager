<template>
    
    <div class="login_form">    

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
                // this.$router.push('/');
                // on redirige vers la page précédente d'où on vient 
                this.$router.go(-1);

            } else {
                document.getElementById('errors').innerHTML = this.response;
            }
        },
    },

};

</script>

<style lang="scss" scoped>
    .view_container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>    