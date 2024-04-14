import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  return inject(AuthService).isOuth().pipe(
    tap(state => {
      if (!state) {
        router.navigateByUrl('/login');
      }
    })
  );
};
