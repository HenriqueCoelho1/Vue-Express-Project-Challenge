import Vuex from "vuex"

const store = new Vuex.Store({
    state: {
        user: null,
        token: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setUser(state, user) {
            state.user = user
        },
    }
})

export default store