<template>
  <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#updateEpisode"> <i class="fa-solid fa-file-pen"></i> Modier </button>
  <!-- Modal update -->
  <div class="modal fade" id="updateEpisode" tabindex="-1" aria-labelledby="modalUpdateLabel" aria-hidden="true"   v-for="serie in serie" :key="serie.name">
     <div class="modal-dialog">
       <div class="modal-content">
         <div class="modal-header">
           <h1 class="modal-title fs-5" id="modalUpdateLabel"> Modifier l'épisode </h1>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
          <form method="post" @submit.prevent="handleSubmitUpdate">
            <fieldset>
              <legend> Ajouter une serie </legend>
              <div class="mb-3">
                <label for="titleUpdate" class="form-label"> Titre :</label>
                <input type="text" id="titleUpdate" class="form-control" v-model="serie.title">
              </div>
              <div class="mb-3">
                <label for="categorySelectUpdate" class="form-label">Categorie</label>
                <select id="categorySelectUpdate" class="form-select" v-model="serie.category_id">
                  <option v-for="category in categorys" :key="category.id" :value="category.id"> {{ category.name }}</option>
                </select>
                <i class="fa-solid fa-plus"></i>
              </div>
              <div class="mb-3">
                <label for="synopsisTextInputUpdate" class="form-label"> Synopsis :</label>
                <input type="textarea" id="synopsisTextInputUpdate" class="form-control" placeholder="Synopsis" v-model="serie.synopsis">
              </div>
              <div class="mb-3">
                <label for="posterInputUpdate" class="form-label"> Poster :</label>
                <input type="textarea" id="posterInputUpdate" class="form-control" placeholder="Poster" v-model="serie.poster">
              </div>
              <div class="mb-3">
                <label for="yearInputUpdate" class="form-label"> Année de parution</label>
                <input type="number" id="yearInputUpdate" class="form-control" placeholder="Année" v-model="serie.year">
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </fieldset>
          </form>
         </div>
       </div>
     </div>
   </div>

   </template>
   <script>
   import axios from "axios";
   export default {
     name: "ProgramUpdate",
     data(){
       return {
         serie: [],
         seasons: [],
         programId: this.$route.params.id,
         categorys: [],
       }
     },
     methods: {
      updateSerie: function (serie) {
        console.warn(serie)
      },
       handleSubmitUpdate() {
        console.warn(this.serie)
        axios
         .post('/update/'+this.$route.params.id+'/program/', this.serie);
         
       }
     },                                        
     async created(){
       axios   
               .get('/serie/'+this.$route.params.id)
               .then(response => this.serie = response.data);
       axios 
                .get('/seasons/'+this.$route.params.id)
                .then(response => this.seasons = response.data);
       axios
              .get('/category')
              .then(response => this.categorys = response.data);
     },                     
   }
   </script>
   
   <style>
   
   </style>