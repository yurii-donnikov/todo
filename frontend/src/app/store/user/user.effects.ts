import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { changeUser, changeSuccess, changeFailure } from './user.actions';
import { UserApi } from '../../core/api/user.api';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userApi = inject(UserApi);
  private router = inject(Router);

  changeUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(changeUser),
      switchMap(({ name, email }) =>
        this.userApi.changeUser(name, email).pipe(
          map(({ user }) => {
            return changeSuccess({ user });
          }),
          catchError((err) => of(changeFailure({ error: err.message })))
        )
      )
    );
  });
}
