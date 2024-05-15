import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { chatMsg } from '../../interfaces/chatMsg';
import { User } from '../../classes/user/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor(private firestore: AngularFirestore) {
    this.userCollection = this.firestore.collection<User>('users');
    this.users = this.userCollection.valueChanges();
  }

  userAdded(user: User) {
    return this.userCollection.add(JSON.parse(JSON.stringify(user)));
  }
}
