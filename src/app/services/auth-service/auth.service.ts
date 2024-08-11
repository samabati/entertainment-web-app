import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userAuth = new BehaviorSubject(null);
  userAuth$ = this.userAuth.asObservable();

  constructor(private http: HttpClient) {}

  loginUser(email: string, password: string) {
    this.http
      .post(
        'http://localhost:3000/api/v1/auth/login',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          observe: 'response',
        }
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          const { token } = response.body as any;
          this.userAuth.next(token);
        },
        error: (err) => {
          console.log('error:', err);
        },
      });
  }

  isLoggedIn(): boolean {
    let loggedIn;
    this.userAuth$.subscribe((value) => {
      loggedIn = value;
    });
    if (loggedIn === true) {
      return true;
    }
    return false;
  }
}
