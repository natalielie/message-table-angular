import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as MessageActions from '../actions/message.actions';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Injectable()
export class MessageEffects {
  constructor(
    private actions$: Actions,
    private firebaseService: FirebaseService,
    private snackBarService: SnackbarService
  ) {}

  public getMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageActions.getMessages),
      mergeMap(() => {
        return this.firebaseService.getMessages().pipe(
          map((response) =>
            MessageActions.messagesLoaded({ messagesResponse: response })
          ),
          catchError(() =>
            of(
              MessageActions.messagesLoadError({
                error: 'Messages loading failed',
              })
            )
          )
        );
      })
    )
  );

  public createMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageActions.createMessage),
      mergeMap(({ message }) => {
        return this.firebaseService.createMessage(message).pipe(
          map(() => {
            this.snackBarService.openSnackBar('Message was sent!');
            return MessageActions.createMessageSuccess();
          }),
          catchError(() => {
            this.snackBarService.openSnackBar(
              'Message was not sent, try again'
            );
            return of(
              MessageActions.createMessageLoadError({
                error: 'Message was not sent',
              })
            );
          })
        );
      })
    )
  );

  public deleteMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageActions.deleteMessage),
      mergeMap(({ messageId }) => {
        return this.firebaseService.deleteMessage(messageId).pipe(
          map(() => {
            this.snackBarService.openSnackBar('Message was deleted!');
            return MessageActions.deleteMessageSuccess();
          }),
          catchError(() => {
            this.snackBarService.openSnackBar('Deletion failed, try again');
            return of(
              MessageActions.deleteMessageLoadError({
                error: 'Deletion failed',
              })
            );
          })
        );
      })
    )
  );
}
