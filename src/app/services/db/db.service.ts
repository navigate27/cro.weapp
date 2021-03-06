import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UtilService } from '../utils/util.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private api: string = environment.config.apiUrl;
  constructor(private http: HttpClient, private utilService: UtilService) {}

  getSPs() {
    try {
      const headers = this.utilService.setHeaders();
      return this.http.get<any>(`${this.api}/service/partner`, {
        headers,
      });
    } catch (error) {
      console.log(error);
      throw {
        message: error,
      };
    }
  }

  updateSP(request: any) {
    try {
      const headers = this.utilService.setHeaders();
      return this.http.post<any>(`${this.api}/service/partner/update`, request, {
        headers,
      });
    } catch (error) {
      console.log(error);
      throw {
        message: error,
      };
    }
  }

  addSP(request: any) {
    try {
      const headers = this.utilService.setHeaders();
      return this.http.post<any>(`${this.api}/service/partner/add`, request, {
        headers,
      });
    } catch (error) {
      console.log(error);
      throw {
        message: error,
      };
    }
  }

  deleteSP(request: any) {
    try {
      const headers = this.utilService.setHeaders();
      return this.http.post<any>(`${this.api}/service/partner/delete`, request, {
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
