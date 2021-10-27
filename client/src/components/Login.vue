<template>
    <div class="container py-3 col-md-4">
        <form @submit="handleSubmit" ref="form">
            <h3 class="text-center">Login</h3>
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" placeholder="Type your email here" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" placeholder="Type your password here" />
            </div>
            <br />
            <button class="btn btn-primary col-12">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "Login",
    methods: {
        handleSubmit(e){
            e.preventDefault()
            console.log("Testintg")
        }
    }
}
</script>

<style>

</style>