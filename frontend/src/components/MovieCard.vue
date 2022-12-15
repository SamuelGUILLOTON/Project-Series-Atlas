<template>
<div class="row row-cols-3 row-cols-md-3 g-5 card-container flex-wrap px-4">
  <div class="col card-serie" v-for="serie in series" :key="serie.name">
    <div class="card h-100">
      <img :src="serie.poster" class="card-img-top" :alt="serie.title">
      <div class="card-body">
        <h5 class="card-title"> {{ serie.title }} </h5>
        <p class="card-text">{{ serie.synopsis }} </p>
        <div class="d-flex justify-content-start"> 
          <router-link class="btn btn-primary me-3" :to="'serie/show/'+serie.id">Voir</router-link>
          <button type="button" class="btn btn-outline-danger" @click="handleDelete(serie.id)">Supprimer</button>
      </div>
      </div>
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
        series: []
      }
    },
    async created(){
      axios
               .get('/series')
               .then(response => this.series = response.data);
    },
    methods: {
    async handleDelete(serieId) {
       await axios
          .delete("/serie/delete/" + serieId)
      },
    } 
}
  </script>
  
  <style>
  .card-container {
    display: flex;
    justify-content: space-around;
  }
  div.col.card-serie {
    min-width: 330px;
    max-width: 480px;
    max-height: 600px;
  }
  </style>