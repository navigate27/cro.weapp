import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storage: LocalStorageService) {}

  public isAuthenticated(): boolean {
    const token: any = this.storage.get('token');
    return token ? true : false;
  }
}
