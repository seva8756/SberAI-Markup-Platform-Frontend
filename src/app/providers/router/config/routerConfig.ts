import { createRouter, createWebHistory } from 'vue-router'
import { AppRoutes, routes } from '@/shared/const/routes'
import { useUserStore } from '@/entities/User'

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
      name: AppRoutes.CREATE_TASK_AUTO,
      component: () => import('@/pages/CreateTaskAutoPage')
    },
    {
      path: routes.createTaskManual(),
      name: AppRoutes.CREATE_TASK_MANUAL,
      component: () => import('@/pages/CreateTaskManualPage')
    },
    {
      path: routes.users(),
      name: AppRoutes.USERS,
      component: () => import('@/pages/UsersPage')
    },
    {
      path: routes.projects(),
      name: AppRoutes.PROJECTS,
      component: () => import('@/pages/ProjectsPage')
    },
    {
      path: routes.project(),
      name: AppRoutes.PROJECT,
      component: () => import('@/pages/ProjectPage')
    },
    {
      path: routes.userAccount(),
      name: AppRoutes.USER_ACCOUNT,
      component: () => import('@/pages/ProfilePage')
    }
  ]
})

router.beforeEach(async (to, from) => {
  const userStore = useUserStore()
  if (!userStore.mounted) await userStore.initAuthData()

  if (!userStore.userData && to.name !== AppRoutes.AUTH) {
    return { name: AppRoutes.AUTH }
  } else if (userStore.userData && to.name === AppRoutes.AUTH) {
    return { name: AppRoutes.PROJECTS }
  }
})
