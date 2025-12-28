import { Store } from '@ngrx/store';
import { AuthApi } from '../auth.api';
import { autoLogin, logout } from '../../auth/store/auth.actions';
import { catchError, of, tap } from 'rxjs';

export function initAuthFactory(store: Store, authApi: AuthApi) {
  return () => {
    const token = localStorage.getItem('token');

    if (!token) {
      store.dispatch(logout());
      return of(true);
    }
    return authApi.me(token).pipe(
      tap(() => {
        store.dispatch(autoLogin({ token }));
      }),
      catchError(() => {
        localStorage.removeItem('token');
        store.dispatch(logout());
        return of(true);
      })
    );
  };
}
