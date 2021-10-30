<template lang="">
    <div>
        <div class="container py-3">
            <h3 class="text-center">Movies</h3>
            <br />
            <div class="row">
                <div class="col-md-3" v-for="movie in movies" :key="movie.id">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">{{movie.title}}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">{{movie.genre}}</h6>
                            <p class="card-text">{{movie.description}}</p>
                            <router-link class="btn btn-info" to="/movies">See more</router-link>
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
    mounted () {
        const dataToken = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
    MovieServices.getMovies(dataToken).then(res => {
        this.movies = res.data,
        console.log(res.data)
        })
    }
}
</script>
<style lang="">
    
</style>