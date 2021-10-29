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
import axios from "axios"
export default {
    name: "Login",
    data(){
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        async handleSubmit(){
            const data  = {
                email: this.email,
                passsword: this.password
            }
            const response = await axios.post("http://localhost:5000/api/login", data)
            localStorage.setItem("token", response.data.accessToken)
            console.log(response)
            this.setUser(this.email)
            this.setToken(response.data.accessToken)
            this.$router.push("/")
        }
    }
}
</script>

<style>

</style>