<template>
    <div class="form-group">
    <label for="tag">Tag</label>
        <select v-model="selectedTag" id="tag">
            <option value="" disabled selected hidden>Choisir un tag</option>
            <option v-for="item in tags" :key="item.id" :value="item.name">{{ item.name }}</option>
        </select>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedTag = defineModel({
    prop: 'selectedTag',
    event: 'change'
});

const tags = ref([
    { id: 1, name: 'Doc' },
    { id: 2, name: 'Snippet' },
    { id: 3, name: 'Tuto' },
    { id: 4, name: 'Article' },
    { id: 5, name: 'lien' },
    { id: 6, name: 'Autre' },
]);


</script>

<style lang="scss">
/* Ajoutez du style si nécessaire */
</style>
