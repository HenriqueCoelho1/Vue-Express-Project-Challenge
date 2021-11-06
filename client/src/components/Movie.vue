<template lang="">
    <div>
        <div class="container py-3">
            <h3 class="text-center">Movies</h3>
            {{$store.getters.userInfo}}
            <br />
            <div class="row">
                <div class="col-md-3" v-for="movie in movies" :key="movie.id">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">{{movie.title}}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">{{movie.genre}}</h6>
                            <p class="card-text">{{movie.description}}</p>
                            <v-btn 
                            @click="navigateTo({name: 'movies', params: movie.id})" 
                            class="btn btn-info">See more</v-btn>
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
    data (){
        return {
            movies: null 
        }
    },
    methods: {
        navigateTo(route){
            this.$router.push(`/${route.name}/${route.params}`)
        }
    },
    mounted () {
        const dataToken = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
    MovieServices.getMovies(dataToken).then(res => {
        this.$store.dispatch("setMovies", res.data),
        this.movies = this.$store.getters.allMovies
        console.log(res.data)
        })
    }
    
}
</script>
<style lang="">
    
</style>