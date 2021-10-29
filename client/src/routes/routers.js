import { createRouter, createWebHistory } from "vue-router"
import Home from "../components/Home"
import Login from "../components/Login"
import Register from "../components/Register"
import Create from "../components/Create"
import store from "../store"
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
        meta: { auth: true }
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: { auth: false }
    },
    {
        path: "/register",
        name: "register",
        component: Register,
        meta: { auth: false }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (!store.token) {
            next()
        }
    } else {
        next()
    }
})

export default router