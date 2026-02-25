import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Details from '../views/Details.vue'
import Login from '../views/Login.vue'

const routes = [
 { path:'/', component:Home },
 { path:'/details/:id', component:Details },
 { path:'/login', component:Login }
]

export default createRouter({
 history:createWebHistory(),
 routes
})
