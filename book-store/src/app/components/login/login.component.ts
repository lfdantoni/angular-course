import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router = inject(Router);

  // Two-way binding example: [(ngModel)] keeps this property in sync with the checkbox.
  // Unlike username/password (read once from form.value on submit), this value is
  // always up-to-date in the class and can be checked at any time.
  acceptTerms = false;

  error = '';

  // Template-Driven Form example: uses ngModel + (ngSubmit), FormsModule imported above.
  // The form state lives in the template (#loginForm="ngForm") rather than in the class.
  //
  // onSubmit receives the NgForm instance passed from the template: (ngSubmit)="onSubmit(loginForm)"
  // form.value contains all named ngModel fields as a plain object: { username: '', password: '' }
  // This way the component doesn't need individual properties for each field.
  onSubmit(form: NgForm): void {
    const { username, password } = form.value as { username: string; password: string };

    if (!this.acceptTerms) {
      this.error = 'You must accept the terms and conditions.';
      return;
    }

    if (username === 'admin' && password === 'admin') {
      // Store a mock token so authGuard allows access to protected routes
      localStorage.setItem('token', 'mock-token');
      this.router.navigate(['/add-book']);
    } else {
      this.error = 'Invalid credentials. Try admin / admin.';
    }
  }
}
