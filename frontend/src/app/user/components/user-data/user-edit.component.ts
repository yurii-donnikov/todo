import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-edit-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field appearance="outline">
        <mat-label>Name</mat-label>
        <input matInput formControlName="name" />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Email</mat-label>
        <input matInput type="email" formControlName="email" />
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit">Save</button>
    </form>
  `,
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
})
export class UserEditFormComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<UserEditFormComponent>);
  private data = inject(MAT_DIALOG_DATA);

  form = this.fb.group({
    name: [''],
    email: [''],
  });

  constructor() {
    if (this.data) {
      this.form.patchValue(this.data.user);
    }
  }

  submit() {
    const formValue = this.form.getRawValue();
    this.dialogRef.close(formValue);
  }
}
