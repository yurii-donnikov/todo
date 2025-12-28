import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { logout } from '../../../auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectIsAuthenticated } from '../../../auth/store/auth.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private store = inject(Store);
  private router = inject(Router);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);

  checkStorage() {
    console.log(localStorage.getItem('token'));
  }

  logout() {
    this.store.dispatch(logout());
    localStorage.removeItem('token');
    this.router.navigate(['/registration']);
  }
}
