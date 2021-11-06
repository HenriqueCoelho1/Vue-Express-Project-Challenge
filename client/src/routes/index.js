import { createRouter, createWebHistory } from "vue-router"
import Home from "../components/Home"
import Login from "../components/Login"
import Register from "../components/Register"
import Movie from "../components/Movie"
import MovieCreate from "../components/MovieCreate"
import MovieView from "../components/MovieView"
import MovieUpdate from "../components/MovieUpdate"

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
    },
    {
        path: "/movies/:movieId",
        name: "movies-view",
        component: MovieView,
    },
    {
        path: "/movies/update/:movieId",
        name: "movies-update",
        component: MovieUpdate,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router