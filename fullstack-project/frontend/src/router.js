import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import DetailsView from './views/DetailsView.vue'
import LoginView from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'
import AddStudentView from './views/AddStudentView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/student/:id', component: DetailsView },
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView },
    { path: '/add', component: AddStudentView }
  ]
})
export default router;
