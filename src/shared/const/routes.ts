export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  AUTH = 'auth',
  USERS = 'users'
}
export const routes: Record<AppRoutes, () => string> = {
  [AppRoutes.MAIN]: () => '/',
  [AppRoutes.ABOUT]: () => '/about',
  [AppRoutes.AUTH]: () => '/auth',
  [AppRoutes.USERS]: () => '/users'
}
