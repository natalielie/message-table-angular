import { Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import * as MessageActions from '../../../../store/actions/message.actions';
import { AppState } from 'src/app/store/reducers/message.reducers';
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
    private formBuilder: FormBuilder
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
    this.closeDialog();
  }

  /**
   * close the dialog box
   */
  closeDialog(): void {
    this.formReference?.resetForm();
    this.dialogRef.close();
  }
}
