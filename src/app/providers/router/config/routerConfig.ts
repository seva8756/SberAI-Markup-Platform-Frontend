import { createRouter, createWebHistory } from 'vue-router'
import { AppRoutes, routes } from '@/shared/const/routes'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.main(),
      name: AppRoutes.MAIN,
      redirect: routes.auth()
    },
    {
      path: routes.auth(),
      name: AppRoutes.AUTH,
      component: () => import('@/pages/AuthPage')
    },
    {
      path: routes.users(),
      name: AppRoutes.USERS,
      component: () => import('@/pages/UsersPage')
    }
  ]
})
