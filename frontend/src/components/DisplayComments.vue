<template>
    <div class="container  my-4 py-4 col-xl-8  comment-container">
        <div class="row d-flex justify-content-center ">
            <div class="col-md-12 col-lg-10 col-xl-8  w-100">
            <div class="card">
                <div class="card-header py-3 border-0" style="background-color: #f8f9fa;">
                <div class="d-flex flex-start w-100">
                    <div class="form-outline w-100">
                    <textarea class="form-control" id="textAreaExample" rows="4"
                        style="background: #fff;" v-model="comment" placeholder="Votre commentaire"></textarea>
                    </div>
                </div>
                <div class="float-end mt-2 pt-1">
                    <button type="button" class="btn btn-primary btn-sm" @click="addComment()">poster</button>
                </div>
                </div>

                <div class="card-body border-bottom-2 border-dark" v-for="comment in comments" :key="comment.id">
                <div class="d-flex flex-start align-items-center  text-start">
                    <img class="rounded-circle shadow-1-strong me-3"
                    src="https://randomuser.me/api/portraits/women/39.jpg" alt="avatar" width="60"
                    height="60" />
                    <div>
                    <h6 class="fw-bold text-primary mb-1"> {{ comment.username }}</h6>
                    <p class="text-muted small mb-0">
                        {{ comment.create }}
                    </p>
                    </div>
                </div>

                <p class="mt-3 mb-4 pb-2 text-start">
                {{ comment.comment }}
                </p>

                <div class="small d-flex justify-content-start">
                    <a href="#!" class="d-flex align-items-center me-3">
                    <p v-if="comment.rate > 0">{{ comment.rate }}</p>
                    <i class="far fa-thumbs-up me-2"></i>
                    <p class="mb-0">Like</p>
                    </a>
                </div>
                </div>
                
            </div>
            </div>
        </div>
    </div>
</template>
   <script>
   import axios from "axios";
   export default {
     name: "DisplayComments",
     data(){
       return {
         comments: [],
         programId: this.$route.params.id,
         comment: "",
       }
     },
     methods: {
               getNow: function() {
                       const today = new Date();
                       const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                       return this.dateTime = date ;
                   },
       async addComment () {
         axios   
               .post('/comment/add/'+this.$route.params.id, {
                 comment: this.comment,
                 date: this.getNow()
               });
       },
     },                                        
     async created(){
       axios   
               .get('/comment/'+this.$route.params.id)
                .then(response => this.comments = response.data);
     },                     
   }
   </script>
   
   <style scoped>
    .comment-container {
        max-width: 800px;
    }
   </style>