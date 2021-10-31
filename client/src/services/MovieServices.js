import Api from "./Api"

export default {
    getMovies(data) {
        return Api().get("movies", data)
    },
    getMovie(movieId, data) {
        return Api().get(`movies/update/${movieId}`, data)
    },
    createMovies(movie, dataToken) {
        return Api().post("movie/create", movie, dataToken)
    },
}