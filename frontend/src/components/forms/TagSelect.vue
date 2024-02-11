<template>
    <select v-model="selectedTag" id="tag">
        <option value="" disabled selected hidden>Choisir un tag</option>
        <option v-for="item in tags" :key="item.id" :value="item.name">{{ item.name }}</option>
    </select>
</template>

<script setup>
import { ref } from 'vue'

const selectedTag = defineModel({
    prop: 'selectedTag',
    event: 'change'
});

const tags = ref([
    { id: 1, name: 'Doc' },
    { id: 2, name: 'Tuto' },
    { id: 3, name: 'Article' },
    { id: 4, name: 'lien' },
    { id: 5, name: 'Autre' },
]);


</script>

<style>
/* Ajoutez du style si nécessaire */
</style>
