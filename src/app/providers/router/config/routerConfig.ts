import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import { AppRoutes, routes } from '@/shared/const/routes'
import CreateTask from "@/pages/CreateTask.vue";
import Users from "@/pages/Users.vue";
import Tasks from "@/pages/Tasks.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.main(),
      name: AppRoutes.MAIN,
      component: HomeView
    },
    {
      path: routes.createTask(),
      name: AppRoutes.CREATETASK,
      component: () => CreateTask
    },
    {
      path: routes.users(),
      name: AppRoutes.USERS,
      component: () => Users
    },
    {
      path: routes.createTask(),
      name: AppRoutes.TASKS,
      component: () => Tasks
    }
  ]
})

