export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about'
}
export const routes: Record<AppRoutes, () => string> = {
  [AppRoutes.MAIN]: () => '/',
  [AppRoutes.ABOUT]: () => '/about',
}