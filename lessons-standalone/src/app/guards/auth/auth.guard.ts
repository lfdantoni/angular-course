import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): MaybeAsync<GuardResult> => {
  const router: Router = inject(Router);
  const isValid = localStorage.getItem('role') === 'administrator';

  if (!isValid) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
