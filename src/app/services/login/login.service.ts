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
      const headers = this.utilService.setHeaders();
      return this.http.post<any>(`${this.api}/portal/user/login`, request, {
        headers,
      });
    } catch (error) {
      console.log(error);
      throw {
        message: error,
      };
    }
  }
}
