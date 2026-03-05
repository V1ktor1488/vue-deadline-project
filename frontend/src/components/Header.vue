<template>
  <header>
    <h1>Students</h1>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/details">Details</router-link>
    </nav>
    <hr>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
header {
  padding: 10px;
  background-color: #f0f0f0;
}
nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #333;
}
nav a.router-link-active {
  font-weight: bold;
}
</style>
