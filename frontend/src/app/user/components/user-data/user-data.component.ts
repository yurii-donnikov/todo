import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadedUser } from '../../../store/auth/auth.selectors';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../../../shared/components/modal/modal.component';
import { UserEditFormComponent } from './user-edit.component';
import { User } from '../../../store/auth/auth.models';
import { changeUser } from '../../../store/user/user.actions';

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
      if (result !== undefined) {
        this.animal.set(result);
        this.store.dispatch(changeUser(result));
        console.log(result);
      }
    });
  }
}
