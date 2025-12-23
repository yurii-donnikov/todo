import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const userRoutes: Routes = [
  { path: 'home', component: UserComponent },
  { path: 'settings', component: SettingsComponent },
];
