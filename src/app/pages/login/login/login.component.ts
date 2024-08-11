import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth-service/auth.service';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  emailFocus: boolean = false;
  passwordFocus: boolean = false;
  formSubmitted: boolean = false;
  subscriptions!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.subscriptions = this.authService.userAuth$.subscribe((value) => {
      if (value !== null) {
        this.router.navigate(['/']);
      }
    });
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
      this.authService.loginUser(
        this.loginForm.getRawValue().email,
        this.loginForm.getRawValue().password
      );
    }
  }
}
