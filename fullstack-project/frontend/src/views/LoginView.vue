<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { store } from '../store.js';

const username = ref('');
const password = ref('');
const router = useRouter();

watch(() => store.username, (newVal) => {
    if(newVal) router.push('/');
});

const login = async () => {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.value, password: password.value })
    });
    if(res.ok) {
        await store.fetchUser();
    } else {
        alert('Грешни данни');
    }
};
</script>
<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>
