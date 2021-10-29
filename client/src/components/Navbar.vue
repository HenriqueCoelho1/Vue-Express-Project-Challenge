<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand text-style" to="/">Movie List</router-link>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="btn btn-primary mx-2" to="/login">Sign in</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-secondary mx-2" to="/register">Sign up</router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link class="btn btn-info" to="/create/movie">Create Movie</router-link>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
    
</template>
<script>
export default {
  name: "Navbar"
}
</script>

<style scopped>
.text-style {
  font-size: 30px !important;
  font-family: fantasy !important;
  color: brown !important;

}
</style>