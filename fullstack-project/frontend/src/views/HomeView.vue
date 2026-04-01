<script setup>
import { ref, onMounted } from 'vue';
const students = ref([]);
onMounted(async () => {
    const res = await fetch('/api/students');
    students.value = await res.json();
});
</script>
<template>
  <div>
    <h2>Списък на студентите</h2>
    <div class="student-grid"> <div v-for="student in students" :key="student.id" class="card">
        <h3>{{ student.name }}</h3>
        <router-link :to="'/student/' + student.id">Виж детайли →</router-link>
      </div>
    </div>
  </div>
</template>
