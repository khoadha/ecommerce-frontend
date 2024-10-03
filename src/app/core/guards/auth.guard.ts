import { AuthService } from '../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject, ɵɵinject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let _route = inject(Router);
  const authService = ɵɵinject(AuthService);
  if (!authService.isLoggedIn()) {
    _route.navigate(['sign-in'], { queryParams: { redirectUrl: state.url } });
    return false;
  } else {
    return true;
  }
}

export const signUpStoreGuard: CanActivateFn = (route, state) => {
  let _route = inject(Router);
  const authService = ɵɵinject(AuthService);
  const storeRoleFromToken = authService.getRoleFromToken();
  const managedIdFromToken = authService.getManagedStoreIdFromToken();
  if (authService.isLoggedIn()&&storeRoleFromToken==='User'&&managedIdFromToken==undefined) {
    return true;
  } else {
    _route.navigate(['']);
    return false;
  }
}

export const signedInGuard: CanActivateFn = (route, state) => {
  let _route = inject(Router);
  const authService = ɵɵinject(AuthService);
  if (authService.isLoggedIn()) {
    _route.navigate(['']);
    return false;
  } else {
    return true;
  }
}

export const managerGuard: CanActivateFn = (route, state) => {
  let _route = inject(Router);
  const authService = ɵɵinject(AuthService);
  const managedStoreId = authService.getManagedStoreIdFromToken();
  if (managedStoreId!==undefined) {
    return true;
  } else {
    _route.navigate(['sign-up-store']);
    return false;
  }
}

export const adminGuard: CanActivateFn = (route, state) => {
  let _route = inject(Router);
  const authService = ɵɵinject(AuthService);
  const storeRoleFromToken = authService.getRoleFromToken();
  if (storeRoleFromToken === "Admin") {
    return true;
  } else {
    _route.navigate(['']);
    return false;
  }
}


export const userGuard: CanActivateFn = (route, state) => {
  let _route = inject(Router);
  const authService = ɵɵinject(AuthService);
  const storeRoleFromToken = authService.getRoleFromToken();
  if (storeRoleFromToken === "User") {
    return true;
  } else {
    _route.navigate(['']);
    return false;
  }
}
