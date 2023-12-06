import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { MessagesService } from 'src/app/services/messages.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import {
  createMessage,
  createMessageLoadError,
  createMessageSuccess,
  deleteMessage,
  deleteMessageLoadError,
  deleteMessageSuccess,
  getMessages,
  messagesLoadError,
  messagesLoaded,
} from '../actions/message.actions';

@Injectable()
export class MessageEffects {
  constructor(
    private actions$: Actions,
    private messagesService: MessagesService,
    private snackBarService: SnackbarService
  ) {}

  getMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getMessages),
      mergeMap(() => {
        return this.messagesService.getMessages().pipe(
          map((response) => messagesLoaded({ messagesResponse: response })),
          catchError(() => {
            this.snackBarService.openSnackBar('Messages loading failed', {
              action: 'OK',
              duration: 3000,
            });
            return of(
              messagesLoadError({
                error: 'Messages loading failed',
              })
            );
          })
        );
      })
    )
  );

  createMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createMessage),
      mergeMap(({ message }) => {
        return this.messagesService.createMessage(message).pipe(
          map(() => {
            this.snackBarService.openSnackBar('Message was sent!', {
              action: 'OK',
              duration: 3000,
            });
            return createMessageSuccess();
          }),
          catchError(() => {
            this.snackBarService.openSnackBar(
              'Message was not sent, try again',
              {
                action: 'OK',
                duration: 3000,
              }
            );
            return of(
              createMessageLoadError({
                error: 'Message was not sent',
              })
            );
          })
        );
      })
    )
  );

  deleteMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteMessage),
      mergeMap(({ messageId }) => {
        return this.messagesService.deleteMessage(messageId).pipe(
          map(() => {
            this.snackBarService.openSnackBar('Message was deleted!', {
              action: 'OK',
              duration: 3000,
            });
            return deleteMessageSuccess();
          }),
          catchError(() => {
            this.snackBarService.openSnackBar('Deletion failed, try again', {
              action: 'OK',
              duration: 3000,
            });
            return of(
              deleteMessageLoadError({
                error: 'Deletion failed',
              })
            );
          })
        );
      })
    )
  );
}
