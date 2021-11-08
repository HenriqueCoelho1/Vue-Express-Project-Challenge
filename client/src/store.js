import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"
import SecureLS from "secure-ls"

const ls = new SecureLS({ isCompression: false })

const store = new Vuex.Store({
    state: {
        user: {
            id: null,
            email: null,
            username: null
        },
        movies: {
            id: null,
            title: null,
            description: null,
            genre: null
        },
        token: null,
        isUserLoggedIn: false
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            if (token) {
                state.isUserLoggedIn = true
            } else {
                state.isUserLoggedIn = false
            }
        },
        setUser(state, user) {
            state.user = user
        },
        setMovies(state, movies) {
            state.movies = movies
        }
    },
    actions: {
        setToken({ commit }, token) {
            commit("setToken", token)
        },
        setUser({ commit }, user) {
            commit("setUser", user)
        },
        setMovies({ commit }, movies) {
            commit("setMovies", movies)
        }
    },
    getters: {
        userInfo(state) {
            return state.user
        },
        allMovies(state) {
            return state.movies
        },
        getToken(state) {
            return state.token
        }
    },
    plugins: [
        createPersistedState({
            key: "my_secret_key",
            paths: ["user", "token", "isUserLoggedIn", "movies"],
            storage: {
                getItem: (key) => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: (key) => ls.remove(key)
            }
        })
    ]
})

export default store