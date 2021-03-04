import { Injectable } from '@angular/core';
import { ERROR_MESSAGES } from 'src/app/utils/error-messages';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor() {}

  getErrorMessage(errorMessage: string) {
    return _.get(ERROR_MESSAGES, errorMessage);
  }

  async handleError(error: any) {
    console.log(error);
    const message = this.getErrorMessage(error.error.message);
    alert(error.error.message);
  }
}
