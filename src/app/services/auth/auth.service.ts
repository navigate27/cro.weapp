import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { BehaviorSubject } from 'rxjs';
import { STORAGE_KEYS } from 'src/app/utils/storage-keys';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private storage: LocalStorageService) {}

  public isAuthenticated(): boolean {
    const token: any = this.storage.get(STORAGE_KEYS.TOKEN);
    return token ? true : false;
  }

  public user(): any {
    const user: any = this.storage.get(STORAGE_KEYS.USER_DATA);
    return user;
  }

  public logout(): any {
    this.storage.clear();
  }
}
