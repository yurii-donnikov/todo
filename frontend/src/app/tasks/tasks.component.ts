import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTasks } from '../store/user/user.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TasksComponent {
  private store = inject(Store);
  readonly tasks$ = this.store.select(selectTasks);
}
