<template>
    <div class="container py-3 col-md-4">
        <form @submit.prevent="handleSubmit">
            <h3 class="text-center">Login</h3>
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" v-model="email" placeholder="Type your email here" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" v-model="password" placeholder="Type your password here" />
            </div>
            <br />
            <button class="btn btn-primary col-12">Login</button>
        </form>
    </div>
</template>

<script>
import Auth from "../services/Auth.js"
export default {
    name: "Login",
    data(){
        return {
            email: "",
            password: "",
            error: null
        }
    },
    methods: {
        async handleSubmit(){
            try {
                const data  = {
                email: this.email,
                passsword: this.password
            }
            const response = await Auth.login(data)
            localStorage.setItem("token", response.data.tokens.accessToken)
            this.$store.dispatch("setToken", response.data.tokens.accessToken)
            console.log(response.data.actualUser)
            this.$store.dispatch("setUser", response.data.actualUser)
            this.$router.push("/movies")
            } catch (err) {
                this.error = err.response.data.error
                
            }
            
        }
    }
}
</script>

<style>

</style>