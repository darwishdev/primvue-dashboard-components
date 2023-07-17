import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import RolesListView from '@/views/RolesListView.vue'
import RoleUpdateView from '@/views/RoleUpdateView.vue'
import RoleCreateView from '@/views/RoleCreateView.vue'
import UsersListView from '@/views/UsersListView.vue'
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
          path: '/roles/create',
          name: 'role_create',
          component: RoleCreateView
        },
        {
          path: '/roles/update/:id',
          name: 'role_update',
          component: RoleUpdateView
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
