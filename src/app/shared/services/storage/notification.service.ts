import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showErrorSnackbar(message: string) {
    this.snackBar.open(message, undefined, { duration: 4000, verticalPosition: 'top' });
  }
}
