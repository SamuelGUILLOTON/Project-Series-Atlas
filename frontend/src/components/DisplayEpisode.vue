<template>
    <div class="accordion container my-4 py-4 col-xl-8  season-container" id="accordionPanelsStayOpenExample">
     <div class="accordion-item"  v-for="season in seasons" :key="season.id" >
       <h2 class="accordion-header"  :id="'flush-heading'+season.id">
         <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#flush-collapse'+season.id" aria-expanded="false" :aria-controls="'flush-collapse'+season.id">
           saison {{ season.number}}
         </button>
       </h2>
       <div :id="'flush-collapse'+season.id" class="accordion-collapse collapse text-start" :aria-labelledby="'flush-heading'+season.id" data-bs-parent="#accordionFlushExample"  v-for="episode in episodeFilter(season.id)" :key="episode.id"  >
         <div class="accordion-body text-left">
           <h5>Episode {{ episode.number }} - <strong> {{ episode.title }} </strong> </h5>
            <p> {{ episode.synopsis}}</p>
         </div>
       </div>
     </div>
   </div>                                   
   </template>
   <script>
   import axios from "axios";
   export default {
     name: "DisplayEpisode",
     data(){
       return {
         episodes: [],
         seasons: [],
       }
     }, 
     methods: {
     episodeFilter: function (seasonId) {
       return this.episodes.filter(episode => episode.season_id == seasonId)
     }
    },                                      
     async created(){
       axios                           
                .get('/serie/show/'+this.$route.params.id)
                .then(response => this.episodes = response.data);
       axios 
                .get('/seasons/'+this.$route.params.id)
                .then(response => this.seasons = response.data);
     },                     
   }
   </script>
   
   <style scoped>
   .season-container {
    max-width: 800px;
   }
   </style>