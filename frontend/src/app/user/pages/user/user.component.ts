import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { UserDataComponent } from '../../components/user-data/user-data.component';

@Component({
  selector: 'app-user',
  imports: [CommonModule, UserDataComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  private store = inject(Store);
}
