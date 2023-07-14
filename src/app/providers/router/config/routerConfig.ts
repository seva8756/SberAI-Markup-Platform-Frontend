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
      path: routes.createTaskAuto(),
      name: AppRoutes.CREATETASKAUTO,
      component: () => import('@/pages/CreateTaskAutoPage')
    },
    {
      path: routes.createTaskManual(),
      name: AppRoutes.CREATETASKMANUAL,
      component: () => import('@/pages/CreateTaskManualPage')
    },
    {
      path: routes.users(),
      name: AppRoutes.USERS,
      component: () => import('@/pages/UsersPage')
    },
    {
      path: routes.tasks(),
      name: AppRoutes.TASKS,
      component: () => import('@/pages/TasksPage')
    },
    {
      path: routes.project(),
      name: AppRoutes.PROJECT,
      component: () => import('@/pages/ProjectPage')
    },
    {
      path: routes.userAccount(),
      name: AppRoutes.USERACCOUNT,
      component: () => import('@/pages/ProfilePage')
    }
  ]
})
