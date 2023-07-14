export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  CREATETASKAUTO = 'createTaskAuto',
  CREATETASKMANUAL = 'createTaskManual',
  AUTH = 'auth',
  USERS = 'users',
  TASKS = 'tasks',
  USERACCOUNT = "userAccount"
}
export const routes: Record<AppRoutes, () => string> = {
  [AppRoutes.MAIN]: () => '/',
  [AppRoutes.ABOUT]: () => '/about',
  [AppRoutes.AUTH]: () => '/auth',
  [AppRoutes.CREATETASKAUTO]: () => '/createTaskAuto',
  [AppRoutes.CREATETASKMANUAL]: () => '/createTaskManual',
  [AppRoutes.USERS]: () => '/users',
  [AppRoutes.TASKS]: () => '/tasks',
  [AppRoutes.USERS]: () => '/users',
  [AppRoutes.USERACCOUNT]: () => '/userAccount'
}
