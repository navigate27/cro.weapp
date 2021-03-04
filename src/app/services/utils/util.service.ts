import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  setHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    return headers;
  }
}
