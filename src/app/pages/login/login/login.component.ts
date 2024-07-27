import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  emailFocus: boolean = false;
  passwordFocus: boolean = false;
  formSubmitted: boolean = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
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
  }
}
