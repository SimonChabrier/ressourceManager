<template>
  
    <div class="view_container">
      
      <h1>Login</h1>

      <LoginForm></LoginForm>

    </div>
  </template>
  
  <script>

  import LoginForm from '@/components/LoginForm.vue';
  
  export default {
    name: 'LogIn',
    components: {
      LoginForm,
    },
  };
  
  </script>
  
  <style lang="scss" scoped>
  </style>
  