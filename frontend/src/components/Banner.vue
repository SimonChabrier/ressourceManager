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
    padding: $padding $padding-small;
    text-align: center;
}
  .bg-success {
    background-color: $color-grey-light-1;
  }

</style>