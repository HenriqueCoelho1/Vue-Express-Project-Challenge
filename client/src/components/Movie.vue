<template lang="">
    <div>
        <div class="container py-3 col-md-4">
            <h3 class="text-center">Your movies</h3>
            <div v-for="movie in movies" :key="movie.id">
                {{movie.title}}
                {{movie.description}}
                {{movie.genre}}
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