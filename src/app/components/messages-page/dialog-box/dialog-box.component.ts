import { Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';
import { Subject, catchError, of, takeUntil } from 'rxjs';

import { FirebaseService } from 'src/app/services/firebase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IMessage } from 'src/app/interfaces/message.interface';

/**
 * A component of a dialog box
 */
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
})
export class DialogBoxComponent implements OnDestroy {
  /**
   * A reference to the `messageForm` template within the component's view.
   * Allows working with a form reference, not form itself
   */
  @ViewChild('messageForm')
  formReference?: FormGroupDirective;

  /** a text to show in the snackbar */
  resultText!: string;

  /** an option to show in the snackbar */
  action = 'Ok';
  snackbarDuration = 3000;

  messageData!: IMessage;

  messageForm: FormGroup = this.formBuilder.group({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    text: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
  });

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMessage,
    public firebaseService: FirebaseService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    if (data) {
      this.messageData = data;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.messageForm.valid) {
      this.firebaseService
        .sendMessage(this.messageForm.value)
        .pipe(
          takeUntil(this.destroy$),
          catchError(() =>
            of(
              (this.resultText = 'Message was not send, try again'),
              this.openSnackBar(this.resultText, this.action)
            )
          )
        )
        .subscribe(() => {
          this.closeDialog();
          this.resultText = 'Message was sent!';
          this.openSnackBar(this.resultText, this.action);
        });
    }
  }

  /**
   * Delete message from the table and db
   */
  deleteMessage(): void {
    this.firebaseService
      .deleteMessage(this.messageData.id)
      .pipe(
        takeUntil(this.destroy$),
        catchError(() =>
          of(
            (this.resultText = 'Message was not removed, try again'),
            this.openSnackBar(this.resultText, this.action)
          )
        )
      )
      .subscribe(() => {
        this.closeDialog();
        this.resultText = 'Message was removed';
        this.openSnackBar(this.resultText, this.action);
      });
  }

  /**
   * close the dialog box
   */
  closeDialog(): void {
    this.formReference?.resetForm();
    this.dialogRef.close({ event: 'Cancel' });
  }

  private openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: this.snackbarDuration,
    });
  }
}
