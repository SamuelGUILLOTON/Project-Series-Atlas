<template>
<nav class="navbar navbar-expand-lg bg-light mb-5">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Serie Atlas</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
           <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/add">Ajouter une série</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Se connecter</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">S'inscrire</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link btn btn-outline-success" @click="logout()"> Se déconnecter </a>
          </li>
        </ul>
      </div>
    </div>
</nav>
<router-view/>
</template>

<script>
import axios from "axios";
export default {
  name: 'NavbarApp',
  methods: {
      logout(){
        let self = this;
        axios
          .get("/logout", this.user)
          .then(function (response)  {
            if (response.data.logout  === true) {
             delete axios.defaults.headers.common;
              localStorage.removeItem('token');
              self.$router.push('/');
            } else if(response.data.logout === false) {
              console.warn("error")
            }
          });
      }
      
    }
}
</script>

