import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, map, catchError, exhaustMap } from 'rxjs';
import * as TaskActions  from './task.actions';
import { TaskService } from './task.service';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      exhaustMap(() =>
        this.taskService.getAll().pipe(
          map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
          catchError((error) => of(TaskActions.loadTasksFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private taskService: TaskService) {}
}
