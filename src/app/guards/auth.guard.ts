import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { map, of, switchMap, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.authState$.pipe(
    take(1),
    switchMap((authState) => {
      if (authState.isAuthenticated !== true) {
        return authService.verifyToken();
      }
      return of(authState.isAuthenticated);
    }),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['login']);
        return false;
      }
    })
  );
};
