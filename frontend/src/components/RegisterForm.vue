<template>
  <div class="m-auto w-50 min-vw-50 mt-5 text-start bg-light p-5 border-5 register-form">
    <h4><strong>Inscrivez-vous :</strong></h4>
    <form @submit.prevent="register()">
      <div class="form-group py-2">
        <label for="InputEmail">Votre mail :</label>
        <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="mail" v-model="user.email">
      </div>
      <div class="form-group py-2">
        <label for="usernameInput">Pseudo :</label>
        <input type="text" class="form-control" id="usernameInput" placeholder="Pseudo :" v-model="user.username">
      </div>
      <div class="form-group py-2">
        <label for="InputPassword">Password</label>
        <input type="password" class="form-control" id="InputPassword" placeholder="Password" v-model="user.password">
      </div>
      <div class="form-group py-2">
        <label for="bioInput">bio :</label>
        <input type="text" class="form-control" id="bioInput" placeholder="bio" v-model="user.bio">
      </div>
      <div class="mb-3 text-end mt-3">
        <button type="submit" class="btn btn-primary">S'enregistrer</button>
      </div>
    </form>
  </div>
</template>
  
  <script>
   import axios from "axios";
  export default {
    name: 'RegisterForm',
    data() {
      return {
         user : {
            email:'',
            password:'',
            username: '',
            bio: ''
         }
      }
    },
    methods: {
      register(){
        let self = this;
        axios
          .post("/register", this.user)
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
    .register-form {
      min-width: 400px;
      max-width: 800px;
    }
  </style>
  