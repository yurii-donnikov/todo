import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  loadTasks,
  loadTasksSuccess,
  loadTasksFailure,
  createTasks,
  deleteTask,
  updateTask,
} from './index';
import { TaskApi } from '../../core/api/task.api';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private taskApi = inject(TaskApi);

  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTasks),
      switchMap(() =>
        this.taskApi.getTasks().pipe(
          map((task) => {
            return loadTasksSuccess({ tasks: task });
          }),
          catchError((err) => of(loadTasksFailure({ error: err.message })))
        )
      )
    );
  });

  createNewTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createTasks),
      switchMap(({ task }) => {
        return this.taskApi.createTask(task).pipe(
          map((task) => {
            return loadTasksSuccess({ tasks: task });
          }),
          catchError((err) => of(loadTasksFailure({ error: err.message })))
        );
      })
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTask),
      switchMap(({ id }) => {
        return this.taskApi.deleteTask(id).pipe(
          map((task) => {
            return loadTasksSuccess({ tasks: task });
          }),
          catchError((err) => of(loadTasksFailure({ error: err.message })))
        );
      })
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateTask),
      switchMap(({ task, id }) => {
        return this.taskApi.updateTask(task, id).pipe(
          map((task) => {
            return loadTasksSuccess({ tasks: task });
          }),
          catchError((err) => of(loadTasksFailure({ error: err.message })))
        );
      })
    );
  });
}
