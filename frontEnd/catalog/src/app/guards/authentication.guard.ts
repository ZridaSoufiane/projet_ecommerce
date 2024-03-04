import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthenticationService);
  const router = inject(Router);
  let authenticated = auth.isAuthenticated();
  if(authenticated==false){
    router.navigateByUrl("/login")
    return false;
  }else{
    return true;
  }
};
