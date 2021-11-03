<template>
    <div class="container py-3 col-md-4">
        <form @submit.prevent="update">
            <h3 class="text-center">Update a Movie</h3>
            <div class="alert alert-danger" v-if="error" role="alert">
                {{error}}
            </div>
            <div class="form-group">
                <label>Title</label>
                <input type="text" 
                name="title"
                class="form-control"
                :rules="[required]"
                v-model="movie.title"
                placeholder="Type your username here" />
            </div>
            <div class="form-group">
                <label>Description</label>
                <input type="text"
                name="description"
                class="form-control"
                :rules="[required]"
                v-model="movie.description" 
                placeholder="Type your email here" />
            </div>
            <div class="form-group">
                <label>Genre</label>
                <select class="form-select" 
                :rules="[required]" 
                v-model="movie.genre" 
                name="genre">
                    <option select>{{movie.genre}}</option>
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
            <button class="btn btn-secondary col-12">Update</button>
        </form>
    </div>
</template>

<script>
import MovieServices from "../services/MovieServices"
export default {
    name: "MovieUpdate",
    data(){
    return {
        movie: {
            title: "",
            description: "",
            genre: ""
        },
        error: null,
        required: (value) => !!value || "Required"
        }
    },
    methods:{
        async update(){
            const movieUpdate = {
                title: this.movie.title,
                description: this.movie.description,
                genre: this.movie.genre
            }
            console.log(movieUpdate)
            const dataToken = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }
            try {
                const areAllFieldsFilled = Object
                .keys(this.movie)
                .every(key => !!movieUpdate[key])
                if(!areAllFieldsFilled){
                    console.log(areAllFieldsFilled)
                    this.error = "Please filled in all fields"
                    return
                }
                const movieId = this.$store.state.route.params.movieId
                const response = await MovieServices.updateMovie(movieId, movieUpdate, dataToken)
                this.$router.push("/movies")
                console.log(response)
                
            } catch (err) {
                console.log(err)
            }
        }
        
    },
    async mounted(){
        const dataToken = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        const movieId = this.$store.state.route.params.movieId
        const result = await MovieServices.getMovie(movieId, dataToken)
        console.log(result.data)
        this.movie = result.data
    }
}
</script>

<style>

</style>