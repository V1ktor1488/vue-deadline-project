<template>
<nav>

<router-link to="/">Home</router-link>

<span v-if="user">
Hello {{user}}
<button @click="logout">Logout</button>
</span>

<router-link v-else to="/login">
Login
</router-link>

</nav>
</template>

<script>
export default{

data(){
return{user:null}
},

async mounted(){
try{
const r=await fetch("/api/is-logged")
if(!r.ok) throw new Error()
const d=await r.json()
this.user=d.name
}catch{}
},

methods:{

async logout(){

await fetch("/api/logout",{method:"POST"})

this.user=null

}

}

}
</script>
