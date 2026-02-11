<script setup>
import {ref,onMounted} from "vue"
import axios from "axios"

const students = ref([])

onMounted(async ()=>{
  const res = await axios.get("/api/students")
  students.value = res.data
})
</script>

<template>
<div>
<h1>Students</h1>
<div v-for="s in students" :key="s.id">
  <router-link :to="'/details/'+s.id">{{s.name}}</router-link>
</div>
</div>
</template>
