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
    isLoading: false,
  });

  authState$ = this.authState.asObservable();

  constructor(private http: HttpClient) {}

  loginUser(email: string, password: string) {
    const getAuthState = this.authState.getValue();
    this.authState.next({ ...getAuthState, isLoading: true });
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
            isLoading: false,
          });
          console.log(this.authState);
        })
      );
  }

  signUpUser(email: String, password: String) {
    const authState = this.authState.getValue();
    this.authState.next({ ...authState, isLoading: true });

    return this.http
      .post(
        'http://localhost:3000/api/v1/auth/signup',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          observe: 'response',
        }
      )
      .pipe(
        tap((response) => {
          console.log('response', response);
          const { token, user } = response.body as any;
          this.authState.next({
            isAuthenticated: true,
            token: token,
            user: user,
            isLoading: false,
          });
          localStorage.setItem('auth_token', token);
        })
      );
  }

  logout() {
    localStorage.removeItem('auth_state');
    this.authState.next({
      isAuthenticated: false,
      token: null,
      user: null,
      isLoading: false,
    });
  }

  verifyToken(): Observable<any> {
    const getAuthState = this.authState.getValue();
    this.authState.next({ ...getAuthState, isLoading: true });

    const token = localStorage.getItem('auth_token');

    if (!token) {
      const getAuthState = this.authState.getValue();
      this.authState.next({ ...getAuthState, isLoading: false });
      return of(false);
    } else {
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
              isLoading: false,
            });

            console.log(this.authState);
          }),

          catchError((error) => {
            console.log('Unable to verify token', error);
            this.authState.next({
              isAuthenticated: false,
              token: null,
              user: null,
              isLoading: false,
            });
            console.log(this.authState);
            return of(false);
          })
        );
    }
  }
}
