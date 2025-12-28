import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadedUser } from '../../../auth/store/auth.selectors';
import { CommonModule } from '@angular/common';
import { User } from '../../../auth/store/auth.models';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { UserEditComponent } from './user-edit.component';

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
  private modal = inject(ModalService);

  openModal(user: User) {
    this.modal.open({
      component: UserEditComponent,
      data: user,
      width: '400px',
    });
  }
}
