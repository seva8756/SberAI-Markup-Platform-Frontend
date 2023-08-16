import { routes } from '@/shared/const/routes'

export const links = [
  {
    title: 'Проекты',
    to: routes.projects()
  },
  {
    title: 'Создать',
    to: routes.createTaskAuto(),
    isAdmin: true
  },
  {
    title: 'Пользователи',
    to: routes.users(),
    isAdmin: true
  }
]
