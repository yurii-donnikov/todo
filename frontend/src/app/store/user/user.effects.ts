import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  changeUser,
  changeSuccess,
  changeFailure,
  getTasks,
  getTasksSuccess,
  getTasksFailure,
} from './user.actions';
import { UserApi } from '../../core/api/user.api';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userApi = inject(UserApi);

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

  getTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTasks),
      switchMap(() =>
        this.userApi.getTasks().pipe(
          map((task) => {
            console.log(task);
            return getTasksSuccess({ tasks: task });
          }),
          catchError((err) => of(getTasksFailure({ error: err.message })))
        )
      )
    );
  });
}
