import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { IMessage } from 'src/app/interfaces/message.interface';
import { AppState } from 'src/app/store/reducers/message.reducers';
import { selectAllMessages } from 'src/app/store/selectors/message.selectors';
import { DeleteDialogBoxComponent } from './dialog-box-delete/dialog-box-delete.component';
import { CreateDialogBoxComponent } from './dialog-box-create/dialog-box-create.component';
import { DialogBoxSize } from 'src/app/shared/globals';
import { getMessages } from 'src/app/store/actions/message.actions';

/**
 * a component of the Message Page
 */
@Component({
  selector: 'app-messages-page',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesPageComponent implements OnInit, OnDestroy {
  /** Table paginator */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  /** Table sort */
  @ViewChild(MatSort) sort!: MatSort;

  readonly displayedColumns: string[] = [
    'id',
    'date',
    'name',
    'text',
    'action',
  ];

  /** an observable of assessment data */
  dataSource$ = this.store.select(selectAllMessages);
  dataSource = new MatTableDataSource<IMessage>([]);

  /** data for a paginator */
  page = 0;
  pageSize = 5;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    // get messages
    this.store.dispatch(getMessages());

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
   * open a create dialog box
   */
  openCreateDialog(): void {
    let dialogRef = this.dialog.open(CreateDialogBoxComponent, {
      width: DialogBoxSize.dialogCreateWidth,
      height: DialogBoxSize.dialogCreateHeight,
    });
  }

  /**
   * open a delete dialog box
   */
  openDeleteDialog(message: IMessage): void {
    let dialogRef = this.dialog.open(DeleteDialogBoxComponent, {
      width: DialogBoxSize.dialogDeleteWidth,
      data: message,
    });
  }
}
