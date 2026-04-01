<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const age = ref('');
const major = ref('');
const router = useRouter();

const addStudent = async () => {
    const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.value, age: age.value, major: major.value })
    });
    if(res.ok) router.push('/');
};
</script>
<template>
  <div>
    <h2>Добави Студент</h2>
    <form @submit.prevent="addStudent">
      <input v-model="name" placeholder="Име" required />
      <input type="number" v-model="age" placeholder="Възраст" required />
      <input v-model="major" placeholder="Специалност" required />
      <button type="submit">Добави</button>
    </form>
  </div>
</template>
