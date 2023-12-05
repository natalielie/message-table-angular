import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { IMessage } from 'src/app/interfaces/message.interface';
import * as MessageActions from '../../../store/actions/message.actions';
import { AppState } from 'src/app/store/reducers/message.reducers';
import { selectAllMessages } from 'src/app/store/selectors/message.selectors';
import { DeleteDialogBoxComponent } from './dialog-box-delete/dialog-box-delete.component';
import { CreateDialogBoxComponent } from './dialog-box-create/dialog-box-create.component';

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

  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

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
      dialogRef = this.dialog.open(DeleteDialogBoxComponent, {
        width: this.dialogDeleteWidth,
        data: message,
      });
    } else {
      dialogRef = this.dialog.open(CreateDialogBoxComponent, {
        width: this.dialogCreateWidth,
        height: this.dialogCreateHeight,
      });
    }
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
}
