import { createRouter, createWebHistory } from "vue-router"
import Home from "../components/Home"
import Login from "../components/Login"
import Register from "../components/Register"
import Create from "../components/Create"
import Movie from "../components/Movie"

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/create/movie",
        name: "create",
        component: Create,
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