import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Message } from '../../classes/msg/message';
import { chatMsg } from '../../interfaces/chatMsg';


@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private chatCollection: AngularFirestoreCollection<chatMsg>;
  chats: Observable<chatMsg[]>;

  constructor(private firestore: AngularFirestore) {
    this.chatCollection = this.firestore.collection<chatMsg>('chats');
    this.chats = this.chatCollection.valueChanges();
  }

  msgSended(msg: chatMsg) {
    return this.chatCollection.add(msg);
  }
}
