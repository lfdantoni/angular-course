import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

// Functional guard — the modern approach in Angular 15.2+
// CanActivateFn is a type alias for a function: (route, state) => boolean | UrlTree
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    return true; // allow navigation
  }

  // router.parseUrl() returns a UrlTree, which the router treats as a redirect
  return router.parseUrl('/login');
};

// Legacy reference: class-based guard (deprecated since Angular 15.2 — do NOT use in new projects)
//
// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//   canActivate(): boolean {
//     return !!localStorage.getItem('token');
//   }
// }
