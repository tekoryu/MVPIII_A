import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
import DashBoard from '@/components/DashBoard.vue'
import HomePage from '@/components/HomePage.vue'
import ReuniaoAgenda from '@/components/ReuniaoAgenda.vue'

const routes = [
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: DashBoard
  },
  { path: '/login', name: 'Login', component: LoginForm, meta: { requiresAuth: false } },
  { path: '/', name: 'Home', component: HomePage, meta: { requiresAuth: true } },
  { path: '/dashboard', name: 'Dashboard', component: DashBoard, meta: { requiresAuth: true } },
  {
    path: '/reuniao/:codigo',
    name: 'ReuniaoAgenda',
    component: ReuniaoAgenda,
    meta: { requiresAuth: false },
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
