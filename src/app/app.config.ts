import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      AngularFireModule.initializeApp({
        apiKey: 'AIzaSyAqZPSUNuT1Xzq98L3SJGkuM_fQ8q-tk9w',
        authDomain: 'saladejuegos-2ffe9.firebaseapp.com',
        projectId: 'saladejuegos-2ffe9',
        storageBucket: 'saladejuegos-2ffe9.appspot.com',
        messagingSenderId: '239788323340',
        appId: '1:239788323340:web:4b68a21cba7f0d28ca3429',
      })
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
