import { createRouter, createWebHistory } from "vue-router"
import Home from "../components/Home"
import Login from "../components/Login"
import Register from "../components/Register"
import Movie from "../components/Movie"
import MovieCreate from "../components/MovieCreate"

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/movies/create",
        name: "movies_create",
        component: MovieCreate,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/movies",
        name: "movies",
        component: Movie,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router