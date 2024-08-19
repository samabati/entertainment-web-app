import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth-service/auth.service';
import { inject } from '@angular/core';
import { take } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  console.log('intercepted req url: ', req.url);

  let token;

  authService.authState$.pipe(take(1)).subscribe((value) => {
    console.log('interceptor auth state:', value);
    token = value.token;
  });

  console.log('token:', token);
  if (!req.headers.get('Authorization') && token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    console.log('Auth request: ', authReq);
    return next(authReq);
  }

  return next(req);
};
