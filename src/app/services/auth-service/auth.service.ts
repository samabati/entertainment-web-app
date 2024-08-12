import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { AuthState } from '../../models/auth-state';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    token: null,
    user: null,
  });

  authState$ = this.authState.asObservable();

  constructor(private http: HttpClient) {
    this.verifyToken().subscribe();
  }

  loginUser(email: string, password: string) {
    return this.http
      .post<User>(
        'http://localhost:3000/api/v1/auth/login',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          observe: 'response',
        }
      )
      .pipe(
        tap((response) => {
          const { token, user } = response.body as any;
          localStorage.setItem('auth_token', token);
          this.authState.next({
            isAuthenticated: true,
            token: token,
            user: user,
          });
          console.log(this.authState);
        })
      );
  }

  isLoggedIn(): boolean {
    console.log('isloggedin:', this.authState.getValue());
    return this.authState.getValue().isAuthenticated;
  }

  logout() {
    localStorage.removeItem('auth_state');
    this.authState.next({
      isAuthenticated: false,
      token: null,
      user: null,
    });
  }

  verifyToken(): Observable<any> {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      return of(false);
    }

    return this.http
      .get<User>('http://localhost:3000/api/v1/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        observe: 'response',
      })
      .pipe(
        tap((user) => {
          console.log(user);
          this.authState.next({
            isAuthenticated: true,
            token: token,
            user: {
              id: user.body?.id!,
              name: user.body?.name!,
              email: user.body?.email!,
            },
          });

          console.log(this.authState);
        }),

        catchError((error) => {
          console.log('Unable to verify token', error);
          this.authState.next({
            isAuthenticated: false,
            token: null,
            user: null,
          });
          console.log(this.authState);
          return of(false);
        })
      );
  }
}
