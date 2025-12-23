import { Routes } from '@angular/router';
import { authRoutes } from './auth/auth.routes';
import { userRoutes } from './user/user.routes';

export const routes: Routes = [
  ...authRoutes,
  ...userRoutes,
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
