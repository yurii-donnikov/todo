import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './auth/store/auth.reducer';
import { routes } from './app.routes';
import { AuthEffects } from './auth/store/auth.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      auth: authReducer,
    }),
    provideEffects(AuthEffects),
    provideRouter(routes),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }),
  ],
};
