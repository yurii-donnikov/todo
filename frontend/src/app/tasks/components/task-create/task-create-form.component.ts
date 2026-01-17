import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

export type TaskStatus = 'new' | 'progress' | 'done';

@Component({
  selector: 'app-task-create-form',
  templateUrl: './task-create-form.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  styleUrl: './task-create-form.component.scss',
})
export class TaskCreateFormComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<TaskCreateFormComponent>);
  private data = inject(MAT_DIALOG_DATA);

  constructor() {
    if (this.data) {
      this.form.patchValue(this.data.task);
    }
  }

  form = this.fb.group({
    title: [''],
    status: ['new' as TaskStatus, Validators.required],
  });

  submit() {
    const formValue = this.form.getRawValue();
    this.dialogRef.close(formValue);
  }
}
