import Vuex from "vuex"

const store = new Vuex.Store({
    state: {
        user: null,
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
    },
    actions: {
        setToken({ commit }, token) {
            commit("setToken", token)
        },
        setUser({ commit }, user) {
            commit("setUser", user)
        }
    },
})

export default store