<template>
  <section class="login_container">
    <h1>Login</h1>
      <LoginForm></LoginForm>
  </section>
  </template>
  
  <script setup>

  import LoginForm from '@/components/LoginForm.vue';
  

  </script>
  
  <style lang="scss">
  .login_container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 176px);
    flex-direction: column;
  }
  </style>
  