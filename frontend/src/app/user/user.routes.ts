import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { authGuard } from '../core/guards/auth.guard';

export const userRoutes: Routes = [
  { path: 'home', component: UserComponent, canActivate: [authGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
];
