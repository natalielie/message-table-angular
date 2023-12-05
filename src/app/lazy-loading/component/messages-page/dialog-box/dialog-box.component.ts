import { Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';
import { Subject, last, take, takeLast, takeUntil, timer } from 'rxjs';
import { Store } from '@ngrx/store';

import * as MessageActions from '../../../../store/actions/message.actions';
import { AppState } from 'src/app/store/reducers/message.reducers';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IMessage } from 'src/app/interfaces/message.interface';
import { selectState } from 'src/app/store/selectors/message.selectors';

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

  /** an option to show in the snackbar */
  action = 'Ok';
  snackbarDuration = 3000;

  messageData!: IMessage;

  messageForm: FormGroup = this.formBuilder.group({
    name: new FormControl<string>('', [Validators.required]),
    text: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
  });

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMessage,
    private store: Store<AppState>,
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
      this.store.dispatch(
        MessageActions.createMessage({ message: this.messageForm.value })
      );
      this.setResultText();

      this.closeDialog();
    }
  }

  /**
   * Delete message from the table and db
   */
  deleteMessage(): void {
    this.store.dispatch(
      MessageActions.deleteMessage({ messageId: this.messageData.id })
    );
    this.setResultText();

    this.closeDialog();
  }

  /**
   * close the dialog box
   */
  closeDialog(): void {
    this.formReference?.resetForm();
    this.dialogRef.close();
  }

  private openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: this.snackbarDuration,
    });
  }

  private setResultText(): void {
    this.store.select(selectState).subscribe((value) => {
      if (value.resultText) {
        let resultText = value.resultText;
        this.openSnackBar(resultText, this.action);
      } else {
        let resultText = value.error!;
        this.openSnackBar(resultText, this.action);
      }
    });
  }
}
