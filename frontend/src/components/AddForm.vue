<template>
   <div class="m-auto w-50 min-vw-50 mt-5 text-start bg-light p-5 border-5 form-container"> 
      <form method="post" @submit.prevent="handleSubmit">
        <fieldset>
          <legend><strong> Ajouter une serie </strong></legend>
          <div class="mb-3">
            <label for="disabledTextInput" class="form-label"> Titre :</label>
            <input type="text" id="title" class="form-control" placeholder="Titre" v-model="title">
          </div>
          <div class="mb-3">
            <label for="categorySelect" class="form-label">Categorie :</label>
            <select id="categorySelect" class="form-select" v-model="category_id">
              <option v-for="category in categorys" :key="category.id" :value="category.id"> {{ category.name }}</option>
            </select>
            <a @click="addCategory"> <i class="fa-solid fa-plus"></i> Créer une categorie </a>
            <div class="mb-3" id="newCategory" style="display: none;">
            <input type="text" id="inputNewCategorie"  v-model="category_name" placeholder="Nom de la categorie"> 
            <button class="btn btn-primary" @click="createCategory" > Créer la categorie</button>
          </div>
          </div>
          <div class="mb-3">
            <label for="synopsisTextInput" class="form-label"> Synopsis :</label>
            <input type="textarea" id="synopsisTextInput" class="form-control" placeholder="Synopsis" v-model="synopsis">
          </div>
          <div class="mb-3">
            <label for="yearInput" class="form-label"> Année de parution :</label>
            <input type="number" id="yearInput" class="form-control" placeholder="Année" v-model="year">
          </div>
          <div class="mb-3 text-end">
            <button type="submit" class="btn btn-primary">  <i class="fa-solid fa-save me-1"></i> Enregistrer</button>
          </div>
        </fieldset>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: 'AddForm',
    data(){
    return {
      categorys: [],
      title: "",
      synopsis: "",
      poster: "",
      year: "",
      category_id: "",
      category_name: ""
    }
  },
  methods: {
    handleSubmit() {
      axios
        .post("/add", {
          title: this.title,
          synopsis: this.synopsis,
          poster: this.poster,
          year: this.year,
          category_id: this.category_id
        })
    },
    addCategory() {
      console.log('news')
      const input = document.getElementById('newCategory');
      input.style.display = "block"
    },
    createCategory() {
      axios
        .post("/create-category", this.category_name)
    }
  },
  async created() {
      axios
            .get('/category')
            .then(response => this.categorys = response.data);
    },

}
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .form-container {
      min-width: 350px;
      max-width: 750px;
  }
  </style>