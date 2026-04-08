import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import MainPage from '../views/MainPage.vue'
import DocumentPage from '../views/DocumentPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/main',
    name: 'Main',
    component: MainPage,
  },
  {
    path: '/document',
    name: 'Document',
    component: DocumentPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router