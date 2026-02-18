<template>
  <div v-if="student">
    <h2>Student Details</h2>
    <p><strong>ID:</strong> {{ student.id }}</p>
    <p><strong>Name:</strong> {{ student.name }}</p>
  </div>
  <div v-else>
    <p>Loading student...</p>
  </div>
</template>

<script>
export default {
  name: 'Details',
  data() {
    return {
      student: null
    }
  },
  created() {
    const id = this.$route.params.id; // взимаме ID от URL

    // Взимаме всички студенти от backend и намираме този с ID
    fetch('http://localhost:3000/students')
      .then(res => res.json())
      .then(data => {
        this.student = data.find(s => s.id == id);
      })
      .catch(err => console.error(err));
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 10px;
}
</style>
