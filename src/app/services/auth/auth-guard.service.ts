import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { STORAGE_KEYS } from 'src/app/utils/storage-keys';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    public auth: AuthService,
    public router: Router,
    private storage: LocalStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const user = this.storage.get(STORAGE_KEYS.USER_DATA);

    if (!this.auth.isAuthenticated() || user.account_type !== expectedRole) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
