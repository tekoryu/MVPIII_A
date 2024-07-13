import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router/index'
import store from './store/store'

// enfiar o token nas requests
const token = localStorage.getItem('authToken')
if (token) {
  axios.defaults.headers.common['Authorization'] = `token ${token}`
  console.log('here')
}

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isAuthenticated // Or wherever you store your auth state

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})
createApp(App).use(store).use(router).mount('#app')
