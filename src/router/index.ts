import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import RolesListView from '@/views/RolesListView.vue'
import RoleUpdateView from '@/views/RoleUpdateView.vue'
import RoleCreateView from '@/views/RoleCreateView.vue'
import UsersListView from '@/views/UsersListView.vue'
import UnauthorizedView from '@/views/UnauthorizedView.vue'
import LoginView from '@/views/LoginView.vue'
import AppLayout from '@/components/AppLayout.vue'
import { can } from '@/utils/helpers'
function snakeToCamel(str: string) {
  return str.replace(/([-_]\w)/g, (match) => match[1].toUpperCase());
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard_view',
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
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: UnauthorizedView
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (!can(snakeToCamel('users_list')) && to.name != 'unauthorized' && to.name != 'login') {
    next({ name: 'unauthorized' })
  }
  next()
})

export default router
