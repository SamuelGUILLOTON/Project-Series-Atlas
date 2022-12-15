<template>
    <div class="home">
      <AddForm />
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import AddForm from '@/components/AddForm.vue';
  export default {
    name: 'AddView',
    components: {
      AddForm
    }
  }
  </script>