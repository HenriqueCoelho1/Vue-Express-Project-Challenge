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
                            <a class="btn btn-info" 
                            @click="addToList">Add this movie to your list</a>
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
        navigateTo(route){
            this.$router.push(`/${route.name}/update/${route.params}`)
        },
        addToList(e){
            e.prenvetDefault()
            
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