import Api from "./Api"

export default {
    getMovies(data) {
        return Api().get("movies", data)
    }
}