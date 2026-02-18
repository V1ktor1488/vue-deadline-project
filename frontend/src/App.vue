<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  components: {
    Header
  }
}
</script>

<style>
/* глобални стилове, ако има нужда */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>
