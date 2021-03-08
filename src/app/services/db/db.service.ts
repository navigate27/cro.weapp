import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UtilService } from '../utils/util.service';

@Injectable({
  providedIn: 'root',
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
      return this.http.post<any>(
        `${this.api}/service/partner/update`,
        request,
        {
          headers,
        }
      );
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
      return this.http.post<any>(
        `${this.api}/service/partner/delete`,
        request,
        {
          headers,
        }
      );
    } catch (error) {
      console.log(error);
      throw {
        message: error,
      };
    }
  }

  getVIPs() {
    try {
      const headers = this.utilService.setHeaders();
      return this.http.get<any>(`${this.api}/vip/user/join`, {
        headers,
      });
    } catch (error) {
      console.log(error);
      throw {
        message: error,
      };
    }
  }

  updateVIP(request: any) {
    try {
      const headers = this.utilService.setHeaders();
      return this.http.post<any>(`${this.api}/vip/update`, request, {
        headers,
      });
    } catch (error) {
      console.log(error);
      throw {
        message: error,
      };
    }
  }

  updateVIPStatus(request: any) {
    try {
      const headers = this.utilService.setHeaders();
      return this.http.post<any>(
        `${this.api}/vip/application/status/update`,
        request,
        {
          headers,
        }
      );
    } catch (error) {
      console.log(error);
      throw {
        message: error,
      };
    }
  }

  deleteVIP(request: any) {
    try {
      const headers = this.utilService.setHeaders();
      return this.http.post<any>(`${this.api}/vip/delete`, request, {
        headers,
      });
    } catch (error) {
      console.log(error);
      throw {
        message: error,
      };
    }
  }

  addVIP(request: any) {
    try {
      const headers = this.utilService.setHeaders();
      return this.http.post<any>(`${this.api}/vip/register`, request, {
        headers,
      });
    } catch (error) {
      console.log(error);
      throw {
        message: error,
      };
    }
  }

  getUserByEmail(request: any) {
    try {
      const headers = this.utilService.setHeaders();
      return this.http.post<any>(`${this.api}/search/email`, request, {
        headers,
      });
    } catch (error) {
      console.log(error);
      throw {
        message: error,
      };
    }
  }

  getSPDropPoints() {
    try {
      const headers = this.utilService.setHeaders();
      return this.http.get<any>(`${this.api}/drop/point/sp/all`, {
        headers,
      });
    } catch (error) {
      console.log(error);
      throw {
        message: error,
      };
    }
  }

  addDropPoints(request: any) {
    try {
      const headers = this.utilService.setHeaders();
      return this.http.post<any>(`${this.api}/drop/point/register/many`, request, {
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
