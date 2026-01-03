import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore, Store } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './store/auth/auth.reducer';
import { routes } from './app.routes';
import { AuthEffects } from './store/auth/auth.effects';
import { UserEffects } from './store/user/user.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/services/auth.interceptor';
import { initAuthFactory } from './core/auth/init-auth.factory';
import { AuthApi } from './core/api/auth.api';
import { userReducer } from './store/user/user.reduceer';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAuthFactory,
      deps: [Store, AuthApi],
      multi: true,
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      auth: authReducer,
      user: userReducer,
    }),
    provideEffects(AuthEffects, UserEffects),
    provideRouter(routes),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }),
  ],
};
