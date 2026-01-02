import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadedUser } from '../../../auth/store/auth.selectors';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../../../shared/components/modal/modal.component';
import { UserEditFormComponent } from './user-edit.component';
import { User } from '../../../auth/store/auth.models';

@Component({
  standalone: true,
  selector: 'app-user-data',
  imports: [CommonModule],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss',
})
export class UserDataComponent {
  private store = inject(Store);
  readonly user$ = this.store.select(loadedUser);
  readonly animal = signal('');
  readonly dialog = inject(MatDialog);

  openDialog(user: User): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        title: 'Edit user',
        component: UserEditFormComponent,
        user,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('result ', result);
      if (result !== undefined) {
        this.animal.set(result);
        console.log(result);
      }
    });
  }
}
