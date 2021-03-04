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
    console.log(this.api);
    const headers = this.utilService.setHeaders();
    return this.http.get<any>(`${this.api}/booking/35`, {
      headers,
    });
  }
}
