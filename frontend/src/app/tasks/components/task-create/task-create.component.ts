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
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field appearance="outline">
        <mat-label>title</mat-label>
        <input matInput formControlName="title" />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Status</mat-label>
        <mat-select formControlName="status">
          <mat-option value="new">New</mat-option>
          <mat-option value="progress">In progress</mat-option>
          <mat-option value="done">Done</mat-option>
        </mat-select>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit">Create</button>
    </form>
  `,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
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
