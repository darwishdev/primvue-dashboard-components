import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import RolesListView from '@/views/DashboardView.vue'
import UsersListView from '@/views/DashboardView.vue'
import AppLayout from '@/components/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: DashboardView
        },
        {
          path: '/roles',
          name: 'roles_list',
          component: RolesListView
        },
        {
          path: '/users',
          name: 'users_list',
          component: UsersListView
        },
      ]
    },
  ]
})

export default router
