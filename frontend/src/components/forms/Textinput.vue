<template>
    <div class="form-group">
        <label for="title">Titre de la ressource</label>
        <input 
        v-model="title" 
        type="text" 
        id="title" 
        placeholder="Saisissez le titre">
    </div>

</template>

<script setup>

import { ref, nextTick, watch } from 'vue'


// si le titre existe déjà, je le mets dans le champ
const props = defineProps({
  ressourceTitle: String
});

const title = ref(props.ressourceTitle || ''); // ref à ma props ressourceTitle
const emit = defineEmits(['change']); // je déclare un event pour retourner le titre au parent

watch(() => props.ressourceTitle, (newVal) => {
  title.value = newVal;
});
// retourner le titre au parent
watch(title, async () => { // j'écoute les changements du titre
    await nextTick(); // j'attends que le titre soit bien dans le champ
    emit('change', title.value); // je retourne le titre au parent
});

</script>

<style lang="scss">

</style>