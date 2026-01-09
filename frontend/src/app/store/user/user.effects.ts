import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  updateUser,
  updateUserSuccess,
  updateUserFailure,
} from './user.actions';
import { UserApi } from '../../core/api/user.api';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userApi = inject(UserApi);

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUser),
      switchMap(({ name, email }) =>
        this.userApi.changeUser(name, email).pipe(
          map(({ user }) => {
            return updateUserSuccess({ user });
          }),
          catchError((err) => of(updateUserFailure({ error: err.message })))
        )
      )
    );
  });
}
