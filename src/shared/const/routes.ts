export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  CREATETASK = 'createTask',
  AUTH = 'auth',
  USERS = 'users',
  USERACCOUNT = "userAccount"
}
export const routes: Record<AppRoutes, () => string> = {
  [AppRoutes.MAIN]: () => '/',
  [AppRoutes.ABOUT]: () => '/about',
  [AppRoutes.AUTH]: () => '/auth',
  [AppRoutes.CREATETASK]: () => '/createTask',
  [AppRoutes.USERS]: () => '/users',
  [AppRoutes.USERACCOUNT]: () => '/userAccount'
}
