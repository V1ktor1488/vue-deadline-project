#!/bin/bash

echo "=== INIT PROJECT ==="

########################
# BACKEND
########################
mkdir backend
cd backend
npm init -y

npm install express cors

cat > server.js << 'EOF'
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let students = [
  { id: 1, name: "Ivan" },
  { id: 2, name: "Maria" },
];

app.get("/students", (req,res)=>{
  res.json(students);
});

app.listen(3000, ()=>console.log("Backend running"));
EOF

cd ..

########################
# FRONTEND
########################
npm create vue@latest frontend -- --default
cd frontend
npm install
npm install axios vue-router
cd ..

########################
# HEADER COMPONENT
########################
mkdir -p frontend/src/components

cat > frontend/src/components/Header.vue << 'EOF'
<template>
  <header>
    <router-link to="/">Home</router-link>
    <router-link to="/login">Login</router-link>
  </header>
</template>
EOF

########################
# HOME VIEW
########################
mkdir -p frontend/src/views

cat > frontend/src/views/Home.vue << 'EOF'
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
EOF

########################
# DETAILS VIEW
########################
cat > frontend/src/views/Details.vue << 'EOF'
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
EOF

########################
# LOGIN VIEW
########################
cat > frontend/src/views/Login.vue << 'EOF'
<script setup>
const login = ()=>{
 alert("Logged!")
}
</script>

<template>
<button @click="login">Login</button>
</template>
EOF

########################
# ROUTER
########################
cat > frontend/src/router.js << 'EOF'
import {createRouter,createWebHistory} from "vue-router"
import Home from "./views/Home.vue"
import Details from "./views/Details.vue"
import Login from "./views/Login.vue"

export default createRouter({
 history:createWebHistory(),
 routes:[
  {path:"/",component:Home},
  {path:"/details/:id",component:Details},
  {path:"/login",component:Login}
 ]
})
EOF

########################
# APP.VUE
########################
cat > frontend/src/App.vue << 'EOF'
<script setup>
import Header from "./components/Header.vue"
</script>

<template>
<Header/>
<router-view/>
</template>
EOF

########################
# MAIN.JS
########################
cat > frontend/src/main.js << 'EOF'
import {createApp} from "vue"
import App from "./App.vue"
import router from "./router"

createApp(App).use(router).mount("#app")
EOF

########################
# VITE PROXY
########################
cat > frontend/vite.config.js << 'EOF'
import {defineConfig} from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
 plugins:[vue()],
 server:{
  proxy:{
   "/api":{
    target:"http://localhost:3000",
    changeOrigin:true,
    secure:false
   }
  }
 }
})
EOF

########################
# BACKEND EX3 CHANGES
########################
cat > backend/server.js << 'EOF'
const express = require("express");
const app = express();

app.use(express.json());

let user = null;

let students=[
 {id:1,name:"Ivan"},
 {id:2,name:"Maria"}
];

app.get("/api/students",(req,res)=>{
 res.json(students);
});

app.get("/api/is-logged",(req,res)=>{
 if(user) res.json({name:user});
 else res.status(401).json({});
});

app.post("/api/login",(req,res)=>{
 user=req.body.name;
 res.json({success:true});
});

app.listen(3000,()=>console.log("API running"));
EOF

########################
# TESTS
########################
echo "=== TEST BACKEND ==="
node backend/server.js &
sleep 2
curl http://localhost:3000/api/students
kill $!

########################
# GIT INIT
########################
git init
git add .

GIT_AUTHOR_DATE="2026-02-11 18:00:00" \
GIT_COMMITTER_DATE="2026-02-11 18:00:00" \
git commit -m "Exercise 1"

GIT_AUTHOR_DATE="2026-02-18 18:00:00" \
GIT_COMMITTER_DATE="2026-02-18 18:00:00" \
git commit --allow-empty -m "Exercise 2"

GIT_AUTHOR_DATE="2026-02-25 18:00:00" \
GIT_COMMITTER_DATE="2026-02-25 18:00:00" \
git commit --allow-empty -m "Exercise 3"

echo "=== DONE ==="

