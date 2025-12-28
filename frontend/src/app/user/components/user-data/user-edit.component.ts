import { Component, inject } from '@angular/core';
import { MODAL_DATA } from '../../../shared/components/modal/modal.tokens';
import { User } from '../../../auth/store/auth.models';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  standalone: true,
  template: `
    <h2>Edit user</h2>

    <form [formGroup]="form">
      <input formControlName="name" />
      <input formControlName="email" />
    </form>
  `,
  imports: [CommonModule, ReactiveFormsModule],
})
export class UserEditComponent {
  private fb = inject(FormBuilder);
  private user = inject(MODAL_DATA) as User;
  constructor() {
    this.form.patchValue(this.user);
  }
  form = this.fb.group({
    name: [''],
    email: [''],
  });
}
