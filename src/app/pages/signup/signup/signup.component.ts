import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signUpForm!: FormGroup;
  emailFocus = false;
  passwordFocus = false;
  repeatPasswordFocus = false;
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signUpForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }

  submitForm() {
    this.formSubmitted = true;

    if (
      this.signUpForm.valid &&
      this.signUpForm.getRawValue().password ===
        this.signUpForm.getRawValue().repeatPassword
    ) {
      this.authService
        .signUpUser(
          this.signUpForm.getRawValue().email,
          this.signUpForm.getRawValue().password
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
