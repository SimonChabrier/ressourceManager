<template>
    <div class="form-group">
        <label for="tech">Tech</label>
        <select v-model="selectedTech" id="tech">
            <option value="" disabled selected hidden>Choisir une Tech</option>
            <option v-for="item in techs" :key="item.id" :value="item.name" :id="item.name">{{ item.name }}</option>
        </select>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedTech = defineModel({
    prop: 'selectedTech',
    event: 'change'
});

const techs = ref([
    { id: 1, name: 'PHP' },
    { id: 2, name: 'HTML' },
    { id: 3, name: 'JS' },
    { id: 4, name: 'CSS' },
    { id: 5, name: 'Symfony 5.4'},
    { id: 6, name: 'Express Js' },
    { id: 8, name: 'Vue Js' },
    { id: 10, name: 'Node Js' },
    { id: 11, name: 'MongoDB' },
    { id: 12, name: 'SQL' },
    { id: 13, name: 'PostgreSQL' },
    { id: 14, name: 'SQLite' },
    { id: 15, name: 'Docker' },
    { id: 21, name: 'GitHub' }, 
]);

</script>

<style lang="scss">
</style>
