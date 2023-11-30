import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Location } from '@angular/common';

import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { IMessage } from 'src/app/interfaces/message.interface';
import { homePath } from 'src/app/shared/globals';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss'],
})
export class MessagesPageComponent implements OnInit, OnDestroy {
  /** Table paginator */
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  /** Table sort */
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  displayedColumns: string[] = ['id', 'date', 'name', 'text'];

  dataSource = new MatTableDataSource<IMessage>([]);

  maxMessageLength = 100;
  dialogWidth = '500px';
  dialogHeight = '500px';

  page =
    Number.parseInt(
      this.route.snapshot.queryParamMap.get('pageIndex') as string
    ) ?? 0;
  pageSize =
    Number.parseInt(
      this.route.snapshot.queryParamMap.get('pageSize') as string,
      10
    ) ?? 5;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog,
    private firebaseService: FirebaseService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.firebaseService.getMessages().subscribe((messages) => {
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
   * updating page index and size of the paginator
   */
  updateRouteParameters($event: PageEvent | null): void {
    const params = {
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
    };
    const urlTree = this.router.createUrlTree([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
    //Update route with Query Params
    this.location.go(urlTree.toString());
  }

  /**
   * open a dialog box on delete
   */
  openDialog() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: this.dialogWidth,
      height: this.dialogHeight,
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { event: string; data: IMessage }) => {});
  }

  showMessageText(text: string): string {
    if (text.length <= 100) {
      return text;
    } else {
      return `${text.substring(0, this.maxMessageLength)}...`;
    }
  }

  /**
   * Go to Home page
   */
  goBack(): void {
    this.router.navigate([homePath]);
  }
}
