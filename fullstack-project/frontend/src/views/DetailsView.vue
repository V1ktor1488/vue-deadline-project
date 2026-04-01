<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { store } from '../store.js';

const route = useRoute();
const router = useRouter();
const student = ref({});

onMounted(async () => {
    const res = await fetch(`/api/students/${route.params.id}`);
    student.value = await res.json();
});

const removeStudent = async () => {
    const res = await fetch(`/api/students/${student.value.id}`, { method: 'DELETE' });
    if(res.ok) router.push('/');
};
</script>
<template>
  <div v-if="student.id" class="details-view"> <h2>Детайли за студент</h2>
    <p><strong>Име:</strong> {{ student.name }}</p>
    <p><strong>Възраст:</strong> {{ student.age }} г.</p>
    <p><strong>Специалност:</strong> {{ student.major }}</p>
    <div style="margin-top: 20px;">
        <button v-if="store.username" @click="removeStudent" class="button-danger">Remove Student</button>
    </div>
  </div>
</template>
