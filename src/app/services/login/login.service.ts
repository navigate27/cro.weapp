import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../utils/util.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  api: string = environment.config.apiUrl;
  constructor(private http: HttpClient, private utilService: UtilService) {}

  getLogin(request: any) {
    try {
      return this.http.post(`${this.api}/portal/login`, request);
    } catch (error) {
      console.log(error);
      throw {
        message: error,
      };
    }
  }

  getUser() {
    try {
      const headers = this.utilService.setHeaders();
      return this.http.get(`${this.api}/portal/user`, { headers });
    } catch (error) {
      console.log(error);
      throw {
        message: error,
      };
    }
  }
}
