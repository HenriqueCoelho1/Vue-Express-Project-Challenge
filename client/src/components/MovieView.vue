<template>
    <div>
        <div class="container py-3">
            <h3 class="text-center">Movies</h3>
            <br />
            <div class="row">
                <div class="offset-3 col-md-6">
                    <div class="card text-center">
                        <div class="card-header">
                            {{movie.title}}
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{{movie.genre}}</h5>
                            <p class="card-text">{{movie.description}}</p>
                            <a class="btn btn-info" 
                            @click="navigateTo({name: 'movies', params: movie.id})">Update this movie</a>
                            <a class="btn btn-info ms-2" 
                            @click.prevent="addToList">Add this movie to your list</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MovieServices from "../services/MovieServices"
export default {
    name: "MovieView",
    data(){
    return {
        movie: {},
        error: null,
        required: (value) => !!value || "Required"
        }
    },
    methods:{
        async addToList(){
            const dataToken = {
            headers: {
                Authorization: "Bearer " + this.$store.getters.getToken
            }
            }
            
            try {
                const movieId = this.$store.state.route.params.movieId
                const userId = this.$store.getters.userInfo.id
                console.log(movieId)
                console.log(userId)
                const response = await MovieServices.addMovieToList(userId, movieId, dataToken)
                console.log(dataToken)
                console.log(response)
                this.$router.push("/movies")
               
                
            } catch (err) {
                console.log(err)
                
            }
            
        },
        
        navigateTo(route){
            this.$router.push(`/${route.name}/update/${route.params}`)
        }
        
        
    },
    async mounted(){
        const dataToken = {
            headers: {
                Authorization: "Bearer " + this.$store.getters.getToken
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