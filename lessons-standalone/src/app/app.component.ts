import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { jwtDecode, JwtPayload } from "jwt-decode";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lessons-standalone';

  constructor() {
    console.log('isProd:', environment.production)

    // https://jwt.io/
    // secret signature for testing purpose: your-256-bit-secret
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE1MTYyMzkwMjJ9.HOjxty_qaadLEfsr9UhGb1d1j-f1HhbTywcC3r9TUB8';
    const decoded: JwtPayload & { role: string }  = jwtDecode(jwt);
    console.log('decode', decoded, decoded.role)
    localStorage.setItem('session', jwt)

    localStorage.setItem('role', 'administrator') // user or administrator
  }
}
