<template>

<div>

<h1>Login</h1>

<form @submit.prevent="login">

<input v-model="name" placeholder="Name">

<button>Login</button>

</form>

</div>

</template>

<script>
export default{

data(){
return{name:""}
},

methods:{
async login(){

await fetch("/api/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name:this.name})
})

window.location="/"

}
}

}
</script>
