import Api from "./Api"

export default {
    getMovies(data) {
        return Api().get("movies", data)
    },
    getMovie(movieId, dataToken) {
        return Api().get(`movie/${movieId}`, dataToken)
    },
    createMovies(movieId, dataToken) {
        return Api().post("movie/create", movieId, dataToken)
    },
}