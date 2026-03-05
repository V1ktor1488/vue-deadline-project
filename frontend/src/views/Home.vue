<template>
  <div>
    <ul>
      <li v-for="student in students" :key="student.id">
        <router-link :to="`/details/${student.id}`">{{ student.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      students: []
    }
  },
  created() {
    fetch('http://localhost:3000/students')
      .then(res => res.json())
      .then(data => this.students = data)
      .catch(err => console.error(err));
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 5px 0;
}
</style>
