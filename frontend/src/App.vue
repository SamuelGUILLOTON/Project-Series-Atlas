<template>
  <NavbarApp />
</template>

<script>
   import axios from "axios";
// @ is an alias to /src
import NavbarApp from '@/components/NavbarApp.vue';
export default {
  name: 'App',
  components: {
    NavbarApp
  },
  data(){
     return {
       serie: [],
       programId: this.$route.params.id,
     }
   },
   methods: {
    Authentification() {
        const token = localStorage.getItem('token');
        console.log(token)
      if ( token !== undefined ) { 
      axios
       .post('/auth', token)
       .then(function (response)  {
            if (response.data.auth === true) {
             return true
            } else if(response.data.auth === false) {
              return false
            }
          });
     } else {
      return false
     }
    }
   },                                            
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
