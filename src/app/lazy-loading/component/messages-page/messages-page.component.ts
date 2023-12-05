import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, last, take, takeLast, takeUntil, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { IMessage } from 'src/app/interfaces/message.interface';
import * as MessageActions from '../../../store/actions/message.actions';
import { AppState } from 'src/app/store/reducers/message.reducers';
import {
  selectAllMessages,
  selectState,
} from 'src/app/store/selectors/message.selectors';
import { TemplateLiteralElement } from '@angular/compiler';

/**
 * a component of the Message Page
 */
@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss'],
})
export class MessagesPageComponent implements OnInit, OnDestroy {
  /** Table paginator */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  /** Table sort */
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'date', 'name', 'text', 'action'];

  /** an option to show in the snackbar */
  action = 'Ok';
  snackbarDuration = 3000;

  /** an observable of assessment data */
  dataSource$ = this.store.select(selectAllMessages);
  dataSource = new MatTableDataSource<IMessage>([]);

  maxMessageLength = 100;

  dialogDeleteWidth = '400px';
  dialogCreateWidth = '500px';
  dialogCreateHeight = '510px';

  /** data for a paginator */
  page = 0;
  pageSize = 5;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // get messages
    this.store.dispatch(MessageActions.getMessages());

    this.dataSource$.pipe(takeUntil(this.destroy$)).subscribe((messages) => {
      this.dataSource.data = messages;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if (this.paginator) {
        this.paginator.pageIndex = this.page;
        this.paginator.pageSize = this.pageSize;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * open a dialog box
   */
  openDialog(message = null): void {
    let dialogRef;
    if (message) {
      dialogRef = this.dialog.open(DialogBoxComponent, {
        width: this.dialogDeleteWidth,
        data: message,
      });
    } else {
      dialogRef = this.dialog.open(DialogBoxComponent, {
        width: this.dialogCreateWidth,
        height: this.dialogCreateHeight,
      });
    }

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.setResultText();
      });
  }

  /**
   * trim a message text up to max count symbols
   */
  showMessageText(text: string): string {
    if (text.length <= this.maxMessageLength) {
      return text;
    } else {
      return `${text.substring(0, this.maxMessageLength)}...`;
    }
  }

  private openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: this.snackbarDuration,
    });
  }

  private setResultText(): void {
    this.store
      .select(selectState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        let resultText;
        if (value.resultText) {
          resultText = value.resultText;
        } else {
          resultText = value.error!;
        }

        this.openSnackBar(resultText, this.action);
      });
  }
}
