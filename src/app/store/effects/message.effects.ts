import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as MessageActions from '../actions/message.actions';
import { FirebaseService } from 'src/app/services/firebase.service';
import { of } from 'rxjs';

@Injectable()
export class MessageEffects {
  constructor(
    private actions$: Actions,
    private firebaseService: FirebaseService
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
          map((response) =>
            MessageActions.createMessageLoaded({
              resultText: 'Message was sent!',
            })
          ),
          catchError(() =>
            of(
              MessageActions.createMessageLoadError({
                error: 'Message was not sent, try again',
              })
            )
          )
        );
      })
    )
  );

  public deleteMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageActions.deleteMessage),

      mergeMap(({ messageId }) => {
        return this.firebaseService.deleteMessage(messageId).pipe(
          map((response) =>
            MessageActions.deleteMessageLoaded({
              resultText: 'Message was removed',
            })
          ),
          catchError(() =>
            of(
              MessageActions.deleteMessageLoadError({
                error: 'Delete failed',
              })
            )
          )
        );
      })
    )
  );
}
