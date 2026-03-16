import { Component, inject, Input } from '@angular/core';
import { Task, updateTask } from '../../../store/task';
import { TaskCardComponent } from '../task-card/task-card.component';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-task-column',
  imports: [TaskCardComponent, DragDropModule],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.scss',
})
export class TaskColumnComponent {
  @Input() tasks: Task[] = [];
  @Input() title = '';
  private store = inject(Store);
  @Input() status!: 'new' | 'progress' | 'done';
  @Input() connectedLists: string[] = [];

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const movedTask = event.container.data[event.currentIndex];

      this.store.dispatch(
        updateTask({
          task: {
            ...movedTask,
            status: this.status,
          },
          id: movedTask.id,
        }),
      );
    }
  }
}
