import { Component, Input } from '@angular/core';
import { Task } from '../../../store/task';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task-column',
  imports: [TaskCardComponent],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.scss',
})
export class TaskColumnComponent {
  @Input() tasks: Task[] | null = [];
  @Input() title = '';
}
