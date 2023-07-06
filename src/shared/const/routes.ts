export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  AUTH = 'auth'
}
export const routes: Record<AppRoutes, () => string> = {
  [AppRoutes.MAIN]: () => '/',
  [AppRoutes.ABOUT]: () => '/about',
  [AppRoutes.AUTH]: () => '/auth'
}
