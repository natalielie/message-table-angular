import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { FirestoreModule } from '@angular/fire/firestore';
import {
  provideAnalytics,
  ScreenTrackingService,
} from '@angular/fire/analytics';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { HomeComponent } from './components/home/home.component';
import { MessagesPageComponent } from './lazy-loading/component/messages-page/messages-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { analytics, app, firebaseConfig } from 'src/environment/environment';
import { DialogBoxComponent } from './lazy-loading/component/messages-page/dialog-box/dialog-box.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MessageEffects } from './store/effects/message.effects';
import { MessageReducers } from './store/reducers/message.reducers';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessagesPageComponent,
    DialogBoxComponent,
    NavbarComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ messages: MessageReducers }),
    EffectsModule.forRoot([MessageEffects]),
    StoreDevtoolsModule.instrument({}),
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatRadioModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    FirestoreModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAnalytics(() => analytics),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ScreenTrackingService,
    { provide: FIREBASE_OPTIONS, useValue: firebaseConfig },
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'accent' },
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
