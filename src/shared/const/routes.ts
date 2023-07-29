export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  CREATE_TASK_AUTO = 'createTaskAuto',
  CREATE_TASK_MANUAL = 'createTaskManual',
  AUTH = 'auth',
  USERS = 'users',
  PROJECTS = 'projects',
  USER_ACCOUNT = 'userAccount',
  PROJECT = 'project'
}
export const routes: Record<AppRoutes, () => string> = {
  [AppRoutes.MAIN]: () => '/',
  [AppRoutes.ABOUT]: () => '/about',
  [AppRoutes.AUTH]: () => '/auth',
  [AppRoutes.CREATE_TASK_AUTO]: () => '/create-task-auto',
  [AppRoutes.CREATE_TASK_MANUAL]: () => '/create-task-manual',
  [AppRoutes.USERS]: () => '/users',
  [AppRoutes.PROJECTS]: () => '/projects',
  [AppRoutes.USER_ACCOUNT]: () => '/userAccount',
  [AppRoutes.PROJECT]: () => '/project'
}
