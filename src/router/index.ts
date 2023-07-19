import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import RolesListView from '@/views/RolesListView.vue'
import RoleUpdateView from '@/views/RoleUpdateView.vue'
import RoleCreateView from '@/views/RoleCreateView.vue'
import UsersListView from '@/views/UsersListView.vue'
<<<<<<< HEAD
import ExampleDataList from '@/views/exampleDataList.vue'
=======
import UnauthorizedView from '@/views/UnauthorizedView.vue'
import LoginView from '@/views/LoginView.vue'
>>>>>>> 5dac46e (update formkit builder to get file upload)
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
        {
          path: '/example',
          name: 'example_list',
          component: ExampleDataList
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
  if (to.name != 'login') {
    if (!localStorage.getItem('token')) {
      localStorage.removeItem('permissions')
      localStorage.removeItem('sideBar')
      next({ name: 'login' })
    }
  }
  if (!can(snakeToCamel('role_create')) && to.name != 'unauthorized' && to.name != 'login') {
    next({ name: 'unauthorized' })
  }
  next()
})

export default router
