<template>
    <div class="banner" :class="`bg-${color}`">
        <p class="text-center text-white">{{ text }}</p>
    </div>
</template>

<script>
export default {

    name: 'BannerComponent',

    props: {
        text: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
    },

    components: {
        //
    },

}
</script>

<style lang="scss" scoped>

    .banner {
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
  .bg-success {
    background-color: #28a745;
  }

</style>