export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  CREATETASK = 'createTask',
  USERS = 'users',
  TASKS = 'tasks',
}
export const routes: Record<AppRoutes, () => string> = {
  [AppRoutes.MAIN]: () => '/',
  [AppRoutes.ABOUT]: () => '/about',
  [AppRoutes.CREATETASK]: () => '/createTask',
  [AppRoutes.USERS]: () => '/users',
  [AppRoutes.TASKS]: () => '/tasks',
}