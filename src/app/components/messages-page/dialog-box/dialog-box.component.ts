import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
  FormGroupDirective,
} from '@angular/forms';

import { FirebaseService } from 'src/app/services/firebase.service';
import { Subject, catchError, map, takeUntil } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * A component of a Delete dialog box
 */
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
})
export class DialogBoxComponent {
  /**
   * A reference to the `userForm` template within the component's view.
   * Allows working with a form reference, not form itself
   */
  @ViewChild('messageForm', { static: false })
  formReference?: FormGroupDirective;

  resultText!: string;
  action = 'Ok';

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

  destroy$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    public fbService: FirebaseService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    if (this.messageForm.valid) {
      this.fbService
        .sendMessage(this.messageForm.value)
        .pipe(
          takeUntil(this.destroy$),
          catchError(
            (error) => (this.resultText = 'Message was not send, try again')
          )
        )
        .subscribe(() => {
          this.closeDialog();
          this.resultText = 'Message was sent!';
          this.openSnackBar(this.resultText, this.action);
        });
    }
  }

  closeDialog() {
    this.formReference?.resetForm();
    this.dialogRef.close({ event: 'Cancel' });
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
