<template>
      <MovieCard /> 
</template>
  
  <script>
  // @ is an alias to /src
  import MovieCard from '@/components/MovieCard.vue';
  export default {
    name: 'HomeView',
    components: {
      MovieCard
    }
  }
  </script>
  