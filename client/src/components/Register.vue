<template>
  <div class="container py-3 col-md-4">
        <form @submit.prevent="handleSubmit">
            <h3 class="text-center">Sign Up</h3>
            <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" v-model="username" placeholder="Type your username here" />
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" v-model="email" placeholder="Type your email here" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" v-model="password" placeholder="Type your password here" />
            </div>
            <div class="form-group">
                <label>Repeat Password</label>
                <input type="password" class="form-control" v-model="repeatPassword" placeholder="Repeat your password here" />
            </div>
            <br />
            <button class="btn btn-primary col-12">Register</button>
        </form>
    </div>
</template>

<script>
import Auth from "../services/Auth.js"
export default {
    name: "Register",
    data(){
        return {
            username: "",
            email: "",
            password: "",
            repeatPassword: ""
        }
    },
    methods: {
        async handleSubmit(){
            const data = {
                username: this.username,
                email: this.email,
                password: this.password
            }
            const response = await Auth.register(data)
            
            console.log(response)
            this.$router.push("/login")
        }
    }

}
</script>

<style>

</style>