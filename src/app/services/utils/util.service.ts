import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private snackBar: MatSnackBar) {}

  setHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    return headers;
  }

  showToast(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
