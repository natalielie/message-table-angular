import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { IMessage } from '../interfaces/message.interface';
import { LoaderService } from './loader.service';

/**
 * service to handle firebase requests
 */
@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  readonly api = this.fbs.collection('messages');

  constructor(
    private fbs: AngularFirestore,
    private loaderService: LoaderService
  ) {}

  /**
   * get all messages from the db
   */
  getMessages(): Observable<IMessage[]> {
    this.loaderService.showLoader();
    return this.api.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((action) => {
          const data = action.payload.doc.data() as IMessage;
          data.id = action.payload.doc.id;
          return { ...data };
        }, this.loaderService.hideLoader());
      }),
      catchError((error) => {
        console.error('An error occurred:', error);
        this.loaderService.hideLoader();
        return throwError('Something went wrong');
      })
    );
  }

  /**
   * send a message to a db
   */
  createMessage(message: IMessage): Observable<boolean> {
    this.loaderService.showLoader();
    return new Observable<boolean>((observer) => {
      this.loaderService.showLoader();
      this.api
        .add({
          name: message.name,
          text: message.text,
          date: new Date().toString(),
        })
        .then(() => {
          observer.next(true);
          observer.complete();
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
          this.loaderService.hideLoader();
          observer.next(false);
          observer.complete();
        });
    });
  }

  /**
   * delete a message from the db
   */
  deleteMessage(messageId: string): Observable<boolean> {
    this.loaderService.showLoader();
    return new Observable<boolean>((observer) => {
      this.loaderService.showLoader();
      this.api
        .doc(messageId)
        .delete()
        .then(() => {
          observer.next(true);
          observer.complete();

          this.loaderService.hideLoader();
        })
        .catch((error) => {
          console.error('Error deleting document: ', error);
          observer.next(false);
          observer.complete();

          this.loaderService.hideLoader();
        });
    });
  }
}
