import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectDoneTasks,
  selectInProgressTasks,
  selectNewTasks,
  selectTasks,
} from '../store/task';
import { CommonModule } from '@angular/common';
import { TaskColumnComponent } from './components/task-column/task-column.component';

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
}
