import { Injectable } from '@angular/core';
import { ERROR_MESSAGES } from 'src/app/utils/error-messages';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilService } from '../utils/util.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor(private utilService: UtilService) {}

  getErrorMessage(errorMessage: string) {
    return _.get(ERROR_MESSAGES, errorMessage);
  }

  async handleError(error: any) {
    console.log(error);
    if (error.error) {
      const message = this.getErrorMessage(error.error.response_code);
      if (message) {
        this.utilService.showToast(message);
      } else {
        this.utilService.showToast(error.error.message);
      }
    } else {
      this.utilService.showToast(JSON.stringify(error));
    }
  }
}
