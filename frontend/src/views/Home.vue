<template>
  <div>
    <h1>Students</h1>
    <ul>
      <li v-for="student in students" :key="student.id">{{ student.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: []
    };
  },
  mounted() {
    // fetch към backend на порт 3000
    fetch('http://localhost:3000/students')
      .then(res => res.json())
      .then(data => {
        this.students = data;
      })
      .catch(err => console.error('Error fetching students:', err));
  }
};
</script>
