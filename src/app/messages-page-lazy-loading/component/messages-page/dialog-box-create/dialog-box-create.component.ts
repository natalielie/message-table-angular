import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/reducers/message.reducers';
import { IMessage } from 'src/app/interfaces/message.interface';
import { createMessage } from 'src/app/store/actions/message.actions';

/**
 * A component of a dialog box
 */
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box-create.component.html',
  styleUrls: ['./dialog-box-create.component.scss'],
})
export class CreateDialogBoxComponent {
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

  constructor(
    public dialogRef: MatDialogRef<CreateDialogBoxComponent>,
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {}

  onSubmit(): void {
    if (this.messageForm.valid) {
      this.store.dispatch(createMessage({ message: this.messageForm.value }));
      this.closeDialog();
    }
  }

  /**
   * close the dialog box
   */
  closeDialog(): void {
    this.formReference?.resetForm();
    this.dialogRef.close();
  }
}
