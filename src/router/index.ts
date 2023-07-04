import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import UsersPage from '@/pages/UsersPage.vue'
import PaymentsPage from '@/pages/PaymentsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/users',
    name: 'Users',
    component: UsersPage
  },
  {
    path: '/payments',
    name: 'Payments',
    component: PaymentsPage
  },
  {
    path: '/',
    redirect: '/users'
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
