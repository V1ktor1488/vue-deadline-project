<template>

<div v-if="student">

<h2>{{student.name}}</h2>
<p>Age: {{student.age}}</p>
<p>Grade: {{student.grade}}</p>

</div>

</template>

<script>
export default{
data(){
return{student:null}
},
async mounted(){
const id=this.$route.params.id
const r=await fetch("/api/students/"+id)
this.student=await r.json()
}
}
</script>
