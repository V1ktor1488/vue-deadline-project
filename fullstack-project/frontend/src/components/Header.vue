<script setup>
import { onMounted } from 'vue';
import { store } from '../store.js';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
    store.fetchUser();
});

const logout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    store.username = null;
    router.push('/login');
};
</script>

<template>
  <header class="main-header">
    <div class="logo">
      <router-link to="/"> <span class="logo-text">Проект при Деян</span></router-link>
    </div>
    <nav class="nav-links">
      <span v-if="store.username" class="user-info">
        <span class="welcome-text">Здравей, <b>{{ store.username }}</b></span>
        <router-link to="/add" class="button btn-add">+ Добави</router-link>
        <button @click="logout" class="button btn-logout">Изход</button>
      </span>
      <span v-else class="auth-links">
        <router-link to="/login" class="button btn-transparent">Вход</router-link>
        <router-link to="/register" class="button btn-light">Регистрация</router-link>
      </span>
    </nav>
  </header>
</template>

<style scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  /* Красив преливащ фон */
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
  padding: 15px 25px;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(168, 85, 247, 0.4);
}

.logo a {
  text-decoration: none;
  font-size: 26px;
  font-weight: 800;
  color: #ffffff;
  display: flex;
  align-items: center;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.user-info, .auth-links {
  display: flex;
  align-items: center;
  gap: 15px;
}

.welcome-text {
  color: #ffffff;
  font-size: 16px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

/* Специфични бутони за хедъра, за да си ходят с тъмния фон */
.btn-add {
  background-color: #10b981; /* Изумрудено зелено */
  color: white;
  box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);
}
.btn-add:hover { background-color: #059669; }

.btn-logout {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(5px);
  box-shadow: none;
}
.btn-logout:hover { background-color: rgba(255, 255, 255, 0.3); }

.btn-transparent {
  background-color: transparent;
  color: white;
  border: 1px solid rgba(255,255,255,0.5);
  box-shadow: none;
}
.btn-transparent:hover {
  background-color: rgba(255,255,255,0.1);
  border-color: white;
}

.btn-light {
  background-color: white;
  color: #a855f7;
}
.btn-light:hover {
  background-color: #f8fafc;
  color: #ec4899;
}
</style>
