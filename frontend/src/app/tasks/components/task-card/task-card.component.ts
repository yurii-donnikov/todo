import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Task } from '../../../store/task';

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
}
