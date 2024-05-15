import { Injectable, inject} from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Session } from '../../interfaces/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private firestore: AngularFirestore) {
    this.sessionCollection = this.firestore.collection<Session>('sessions');
    this.sessions = this.sessionCollection.valueChanges();
  }

  private sessionCollection: AngularFirestoreCollection<Session>;
  sessions: Observable<Session[]>;

  agregarMensaje(session: Session) {
    return this.sessionCollection.add(session);
  }
}
