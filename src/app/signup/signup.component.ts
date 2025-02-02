import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      // Form is valid, handle success
      console.log('Form Submitted:', this.signupForm.value);

      // Show success toast
      Toastify({
        text: 'Sign Up successfully!',
        backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
        duration: 3000,
      }).showToast();

      this.signupForm.reset();
    } else {
      this.markFormGroupTouched(this.signupForm);

      // Show error toast
      Toastify({
        text: 'Please fill out all fields correctly.',
        backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc3a0)',
        duration: 3000,
      }).showToast();
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  getPlaceholder(controlName: string): string {
    const placeholders: { [key: string]: string } = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      password: 'Password',
    };
    return placeholders[controlName] || '';
  }

  getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName);

    if (controlName === 'email') {
      if (control?.errors?.['required']) {
        return 'Looks like this is not an email';
      }
    } else {
      if (control?.errors?.['required']) {
        return `${
          controlName.charAt(0).toUpperCase() + controlName.slice(1)
        } cannot be empty`;
      }
      if (control?.errors?.['minlength']) {
        return `${
          controlName.charAt(0).toUpperCase() + controlName.slice(1)
        } must be at least ${
          control.errors['minlength'].requiredLength
        } characters`;
      }
    }

    return '';
  }
}
