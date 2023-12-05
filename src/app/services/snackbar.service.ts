import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * A Snackbar Service
 */
@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  /** an option to show in the snackbar */
  action = 'OK';
  snackbarDuration = 3000;

  constructor(private snackbar: MatSnackBar) {}
  /**
   * open a snackbar on call
   */
  openSnackBar(message: string, action: string = this.action): void {
    this.snackbar.open(message, action, {
      duration: this.snackbarDuration,
    });
  }
}
