<template>
<div>
<h1>Students</h1>

<ul>
<li v-for="s in students" :key="s.id">
<router-link :to="'/details/'+s.id">
{{s.name}}
</router-link>
</li>
</ul>

</div>
</template>

<script>
export default{
data(){
return{students:[]}
},
async mounted(){
const r=await fetch("/api/students")
this.students=await r.json()
}
}
</script>
