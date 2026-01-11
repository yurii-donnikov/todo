import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Task, updateTask } from '../../../store/task';
import { Store } from '@ngrx/store';
import { deleteTask } from '../../../store/task';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../../../shared/components/modal/modal.component';
import { TaskCreateFormComponent } from '../task-create/task-create.component';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TaskCardComponent {
  @Input() task: Task | null = null;
  private store = inject(Store);
  readonly dialog = inject(MatDialog);

  deleteTask() {
    if (this.task) {
      this.store.dispatch(deleteTask({ id: this.task.id }));
    }
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        title: 'Create new task',
        component: TaskCreateFormComponent,
        task,
      },
    });

    dialogRef.afterClosed().subscribe((result: Task) => {
      if (result !== undefined) {
        this.store.dispatch(updateTask({ task: result, id: task.id }));
      }
    });
  }
}
