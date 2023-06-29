import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import { AppRoutes, routes } from '@/shared/const/routes'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.main(),
      name: AppRoutes.MAIN,
      component: HomeView
    },
    {
      path: routes.about(),
      name: AppRoutes.ABOUT,
      component: () => import('@/pages/AboutView.vue')
    }
  ]
})

