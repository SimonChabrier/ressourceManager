<template>
  <div id="spiner" class="loaderBloc hide">
    <span class="spinner"></span>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {

    name: 'SpinerComponent',

    props: {
        text: {
            type: String,
            default: 'Chargement en cours...'
        }
    },

}
</script>

<style lang="scss" scoped>
.spinner {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }
        @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    } 
.loaderBloc {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    flex-direction: column;
    gap: 10px;
}
.hide {
    display: none;
}
</style>