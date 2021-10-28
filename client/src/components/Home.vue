<template lang="">
    <div>
        <h1>Home</h1>
    </div>
</template>
<script>
import axios from "axios"
export default {
    name: "Home",
    data(){
        return {
            info: null
        }
    },
    mounted () {
    axios.get("http://localhost:5000/api/user").then(res => {
        this.info = res.data,
        console.log(res.data)
    })
    }
    
    
}
</script>
<style lang="">
    
</style>