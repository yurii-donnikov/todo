import { Component, inject, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgComponentOutlet } from '@angular/common';
import { User } from '../../../auth/store/auth.models';

export interface DialogData {
  animal: string;
  name: string;
}
export interface ModalData {
  title: string;
  component: Type<unknown>;
  user?: User;
}

@Component({
  standalone: true,
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './modal.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    NgComponentOutlet,
  ],
})
export class DialogOverviewExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject<ModalData>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
