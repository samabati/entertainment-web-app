import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of, take, tap } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.authState$.pipe(
    take(1),
    map((authState) => {
      if (authState.isAuthenticated) {
        router.navigate(['/']);
        return false;
      }
      return true;
    })
  );
};
