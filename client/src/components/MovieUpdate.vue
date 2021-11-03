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
                class="form-control" 
                v-model="movie.title"
                placeholder="Type your username here" />
            </div>
            <div class="form-group">
                <label>Description</label>
                <input type="text"
                class="form-control"
                v-model="movie.description" 
                placeholder="Type your email here" />
            </div>
            <div class="form-group">
                <label>Genre</label>
                <select v-model="movie.genre" class="form-select">
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
    name: "Create",
    data(){
    return {
        movie: {},
        error: null,
        required: (value) => !!value || "Required"
        }
    },
    methods:{
        async update(){
            // const movie = {
            //     title: this.title,
            //     description: this.description,
            //     genre: this.genre
            // }
            // console.log(this.title)
            // console.log(this.description)
            console.log(this.movie)
            const dataToken = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }
            try {
                const movieId = this.$store.state.route.params.movieId
                const response = await MovieServices.updateMovie(movieId, this.movie, dataToken)
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
        console.log(dataToken)
        this.movie = (await MovieServices.getMovie(movieId, dataToken)).data
    }
}
</script>

<style>

</style>