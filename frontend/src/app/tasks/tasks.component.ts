import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectDoneTasks,
  selectInProgressTasks,
  selectNewTasks,
  selectTasks,
  Task,
} from '../store/task';
import { CommonModule } from '@angular/common';
import { TaskColumnComponent } from './components/task-column/task-column.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../shared/components/modal/modal.component';
import { TaskCreateFormComponent } from './components/task-create/task-create.component';
import { createTasks } from '../store/task';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, TaskColumnComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TasksComponent {
  private store = inject(Store);
  readonly tasks$ = this.store.select(selectTasks);

  readonly newTasks$ = this.store.select(selectNewTasks);
  readonly inProgressTasks$ = this.store.select(selectInProgressTasks);
  readonly doneTasks$ = this.store.select(selectDoneTasks);
  readonly dialog = inject(MatDialog);

  createTask(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        title: 'Create new task',
        component: TaskCreateFormComponent,
      },
    });

    dialogRef.afterClosed().subscribe((result: Task) => {
      if (result !== undefined) {
        this.store.dispatch(createTasks({ task: result }));
      }
    });
  }
}
