import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/message.interface';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private fbs: AngularFirestore,
    private loaderService: LoaderService
  ) {}

  getMessages(): Observable<IMessage[]> {
    this.loaderService.showLoader();
    return this.fbs
      .collection('messages')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            const data = action.payload.doc.data() as IMessage;
            const _id = action.payload.doc.id;
            return { _id, ...data };
          }, this.loaderService.hideLoader());
        }),
        catchError((error) => {
          console.error('An error occurred:', error);
          return throwError('Something went wrong');
        })
      );
  }

  sendMessage(message: IMessage): Observable<boolean> {
    this.loaderService.showLoader();
    return new Observable<boolean>((observer) => {
      this.loaderService.showLoader();
      this.fbs
        .collection('messages')
        .add({
          name: message.name,
          text: message.text,
          date: new Date().toString(),
        })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
          observer.next(true);
          observer.complete();
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
          observer.next(false);
          observer.complete();
        });
    });
  }
}
