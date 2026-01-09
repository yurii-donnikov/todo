import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  autoLogin,
  login,
  loginFailure,
  loginSuccess,
  registration,
} from './index';
import { AuthApi } from '../../core/api/auth.api';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadTasks } from '../task';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authApi = inject(AuthApi);
  private router = inject(Router);
  private store = inject(Store);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      switchMap(({ email, password }) =>
        this.authApi.login(email, password).pipe(
          map(({ user, token }) => {
            this.store.dispatch(loadTasks());
            return loginSuccess({ user, token });
          }),
          catchError((err) => of(loginFailure({ error: err.message })))
        )
      )
    );
  });

  registration$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registration),
      switchMap(({ email, password, name }) =>
        this.authApi.registration(email, password, name).pipe(
          map(({ user, token }) => loginSuccess({ user, token })),
          catchError((err) => of(loginFailure({ error: err.message })))
        )
      )
    );
  });

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ token }) => {
          localStorage.setItem('token', token);
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(autoLogin),
      switchMap(({ token }) =>
        this.authApi.me(token).pipe(
          map(({ user, token }) => {
            this.store.dispatch(loadTasks());
            return loginSuccess({ user, token });
          }),
          catchError((err) => of(loginFailure({ error: err.message })))
        )
      )
    )
  );
}
