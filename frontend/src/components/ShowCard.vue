<template>
   <div class="my-4 py-4 col-md-12 col-lg-10 col-xl-8 program-container mx-auto mt-5 text-start bg-light p-5 border-5"  v-for="serie in serie" :key="serie.name">
     <img :src=" serie.poster " class="card-img-top" alt="">
     <div class="card-body">
       <h5 class="card-title"> {{ serie.title }}</h5>
       <p class="card-text"> {{ serie.synopsis }}</p>
       <div class="card-text">
         <small class="text-muted"><strong> {{ serie.year }} - {{ serie.name }} </strong> </small>
       </div>
     </div>
   </div>

 </template>
 <script>
 import axios from "axios";
 export default {
   name: "MovieCard",
   data(){
     return {
       serie: [],
       programId: this.$route.params.id,
     }
   },                        
   async created(){
    await axios   
             .get('/serie/'+this.$route.params.id)
             .then(response => this.serie = response.data);
   },                     
 }
 </script>
 
 <style scoped>
    .program-container {
      max-width: 800px;
    }
 </style>