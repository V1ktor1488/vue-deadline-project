<script setup>
import {ref,onMounted} from "vue"
import axios from "axios"
import {useRoute} from "vue-router"

const route = useRoute()
const student = ref(null)

onMounted(async ()=>{
 const res = await axios.get("/api/students")
 student.value = res.data.find(s=>s.id==route.params.id)
})
</script>

<template>
<div v-if="student">
<h2>{{student.name}}</h2>
</div>
</template>
