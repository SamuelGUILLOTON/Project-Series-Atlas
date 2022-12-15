<template>
   <div class="m-auto m-5 text-start bg-light p-5 border-5 login-container"> 
    <form class="row g-3"  @submit.prevent="login()">
      <div class="col-auto mx-auto">
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="mail" v-model="user.email">
        </div>
        <div class="col-auto mx-auto">
          <label for="inputPassword2" class="visually-hidden">Password</label>
          <input type="password" class="form-control" id="inputPassword2" placeholder="mot de passe" v-model="user.password">
        </div>
        <div class="col-auto mx-auto">
          <button type="submit" class="btn btn-primary mb-3">Se connecter</button>
        </div>
      </form>
    </div>
</template>
  
<script>
   import axios from "axios";
  export default {
    name: 'LoginForm',
    data() {
      return {
         user : {
            email:'',
            password:'',
         }
      }
    },
    methods: {
      login(){
        let self = this;
        axios
          .post("/login", this.user)
          .then(function (response)  {
            if (response.data.auth === true) {
              axios.defaults.headers.common = {'Authorization': `${response.headers.authorization}`};
              localStorage.setItem( 'token', JSON.stringify(response.headers.authorization) );
              self.$router.push('/');
            } else if(response.data.auth === false) {
              console.warn("error")
            }
          });
      }
      
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .login-container {
    max-width: 665px;
  }
  </style>
  