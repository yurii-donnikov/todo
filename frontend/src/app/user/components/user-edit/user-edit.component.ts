import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
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
