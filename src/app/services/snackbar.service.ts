import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISnackbar } from '../interfaces/message.interface';

/**
 * A Snackbar Service
 */
@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}
  /**
   * open a snackbar on call
   */
  openSnackBar(message: string, snackbarData: ISnackbar): void {
    this.snackbar.open(message, snackbarData.action, {
      duration: snackbarData.duration,
    });
  }
}
