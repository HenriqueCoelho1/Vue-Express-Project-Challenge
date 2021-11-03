import Api from "./Api"

export default {
    getMovies(data) {
        return Api().get("movies", data)
    },
    getMovie(movieId, dataToken) {
        return Api().get(`movie/${movieId}`, dataToken)
    },
    createMovies(movie, dataToken) {
        return Api().post("movie/create", movie, dataToken)
    },
    updateMovie(movieId, movieUpdate, dataToken) {
        console.log(movieUpdate)
        return Api().put(`movie/update/${movieId}`, movieUpdate, dataToken)
    },
    addMovieToList(userId, movieId, dataToken) {
        return Api().post(`user/${userId}/movie/${movieId}`, dataToken)
    }
}