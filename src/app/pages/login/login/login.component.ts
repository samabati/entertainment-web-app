import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth-service/auth.service';
import { Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  loginForm!: FormGroup;
  emailFocus: boolean = false;
  passwordFocus: boolean = false;
  formSubmitted: boolean = false;
  subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  toggleEmailFocus(bool: boolean) {
    this.emailFocus = bool;
  }
  togglePasswordFocus(bool: boolean) {
    this.passwordFocus = bool;
  }

  submitForm() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      console.log('submitted');
      this.subscriptions.add(
        this.authService
          .loginUser(
            this.loginForm.get('email')?.value,
            this.loginForm.get('password')?.value
          )
          .subscribe({
            next: (response) => {
              console.log(response);
              this.router.navigate(['/']);
            },
            error: (error) => {
              console.log('An error has occured:', error);
            },
          })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
