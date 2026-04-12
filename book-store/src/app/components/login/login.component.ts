import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router = inject(Router);

  // Mock credentials — in a real app this would call an auth service/API
  username = '';
  password = '';
  error = '';

  // Template-Driven Form example: uses ngModel + (ngSubmit), FormsModule imported above.
  // The form state lives in the template (#loginForm="ngForm") rather than in the class.
  onSubmit(): void {
    if (this.username === 'admin' && this.password === 'admin') {
      // Store a mock token so authGuard allows access to protected routes
      localStorage.setItem('token', 'mock-token');
      this.router.navigate(['/add-book']);
    } else {
      this.error = 'Invalid credentials. Try admin / admin.';
    }
  }
}
