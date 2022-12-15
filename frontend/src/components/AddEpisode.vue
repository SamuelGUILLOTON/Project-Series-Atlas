<template>
    {{ serie }}
   <!-- Button trigger modal -->
   <button type="button" class="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#addEpisode">
    <i class="fa-solid fa-plus-circle"></i> Ajouter un épisode
   </button>
   
   <!-- Modal -->
   <div class="modal fade text-start" id="addEpisode" tabindex="-1" aria-labelledby="modalAddLabel" aria-hidden="true">
     <div class="modal-dialog">
       <div class="modal-content">
         <div class="modal-header">
           <h1 class="modal-title fs-5" id="modalAddLabel"> Ajouter un épisode</h1>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
           <form @submit.prevent="handleSubmit()" action="post">
             <div class="form-group py-3">
               <label for="inputTitle">Titre :</label>
               <input type="text" class="form-control" id="inputTitle" placeholder="Titre :" v-model="title">
             </div>
             <div class="form-group py-3">
               <label for="inputEpisode">Episode numéro :</label>
               <input type="text" class="form-control" id="inputEpisode" placeholder="Numéro" v-model="number">
             </div>
             <div class="form-group py-3">
               <label for="inputSynopsis">Synopsis :</label>
               <textarea class="form-control" id="inputSynopsis"  v-model="synopsis"> </textarea>
             </div>
             <div class="mb-3 py-3">
               <label for="seasonSelect" class="form-label">Saison :</label>
               <select id="seasonSelect" class="form-select" v-model="season_id">
                 <option v-for="season in seasons" :key="season.id" :value="season.number"> {{ season.number }}</option>
               </select>
               <i class="fa-solid fa-plus"></i>
             </div>
             <div class="text-end"> 
                <button type="button" class="btn btn-secondary mx-3" data-bs-dismiss="modal">Quitter</button>
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Ajouter</button>
            </div>
           </form>
         </div>
       </div>
     </div>
   </div>
   </template>
   <script>
   import axios from "axios";
   export default {
     name: "AddEpisode",
     data(){
       return {
         seasons: [],
         programId: this.$route.params.id,
         season_id: [],
         title: [],
         number: [],
         synopsis: [],
       }
     },
     methods: {
       handleSubmit() {
       axios
         .post('/add/'+this.$route.params.id+'/episode/', {
           season: this.season_id,
           title: this.title,
           number: this.number,
           year: this.year,
           synopsis: this.synopsis,
         })
       },
     },                                        
     async created(){
       axios 
                .get('/seasons/'+this.$route.params.id)
                .then(response => this.seasons = response.data);
     },                     
   }
   </script>
   
   <style>
   
   </style>