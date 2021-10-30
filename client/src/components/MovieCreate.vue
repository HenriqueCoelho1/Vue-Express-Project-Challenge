<template>
  <div class="container py-3 col-md-4">
        <form @submit.prevent="create">
            <h3 class="text-center">Create Movie</h3>
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" v-model="title" placeholder="Type your username here" />
            </div>
            <div class="form-group">
                <label>Description</label>
                <input type="text" class="form-control" v-model="description" placeholder="Type your email here" />
            </div>
            <div class="form-group">
                <label>Genre</label>
                <select class="form-select" v-model="genre">
                  <option value="Comedy">Comedy</option>
                  <option value="Sci-fi">Sci-fi</option>
                  <option value="Children">Children</option>
                  <option value="Action">Action</option>
                  <option value="Horror">Horror</option>
                  <option value="Romance">Romance</option>
                  <option value="Noir">Noir</option>
                </select>
            </div>
            <br />
            <button class="btn btn-primary col-12">Register</button>
        </form>
    </div>
</template>

<script>
import MovieServices from "../services/MovieServices"
export default {
    name: "Create",
    data(){
      return {
        title: null,
        description: null,
        genre: null,
        error: null
      }
    },
    methods:{
      async create(){
        const movie = {
          title: this.title,
          description: this.description,
          genre: this.genre
        }
        const dataToken = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        try {
          const areAllFieldsFilled = Object
          .keys(this.movie)
          .every(key => !!movie[key])
          if(!areAllFieldsFilled){
            this.error = "Please filled in"
            return
          }
          const response = await MovieServices.createMovies(movie, dataToken)
          this.$router.push("/movies")
          console.log(response)
        } catch (error) {
          console.log(error)
        }

      }
    }
}
</script>

<style>

</style>