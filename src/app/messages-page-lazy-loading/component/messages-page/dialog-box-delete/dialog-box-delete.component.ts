import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/reducers/message.reducers';
import { IMessage } from 'src/app/interfaces/message.interface';
import { deleteMessage } from 'src/app/store/actions/message.actions';

/**
 * A component of a dialog box
 */
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box-delete.component.html',
  styleUrls: ['./dialog-box-delete.component.scss'],
})
export class DeleteDialogBoxComponent {
  messageData!: IMessage;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMessage,
    private store: Store<AppState>
  ) {
    if (data) {
      this.messageData = data;
    }
  }

  /**
   * Delete message from the table and db
   */
  deleteMessage(): void {
    this.store.dispatch(deleteMessage({ messageId: this.messageData.id }));
    this.closeDialog();
  }

  /**
   * close the dialog box
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
