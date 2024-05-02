import { EventEmitter, Injectable, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../classes/user/user';
import { BehaviorSubject, catchError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FirebaseError } from 'firebase/app';

@Injectable({ 
  providedIn: 'root',
})
export class AuthenticationService{

  user!: User;
  private userLogged: BehaviorSubject<User> = new BehaviorSubject<User>(this.user);
  userCredential: any = null;

  constructor(public ngFireAuth: AngularFireAuth) {}

  
  async loginUser(email: string, password: string) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)
    .then((credenciales) => {
      this.userCredential = credenciales.credential;

      this.user = new User();
      this.user.name = email; 
      this.user.pass = password; 
      this.user.credentials = credenciales;
      this.user.loginDate = new Date().toString();

      this.userLogged.next(this.user);
    });
  }

  async register(email: string, password: string) {
    try{
      const resp = await this.ngFireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.userCredential = resp.user;
      return  resp;
    } catch (e){
      throw  e;
    }
}
  
  async logOut() {
    this.ngFireAuth.signOut();
  }


  get userLoggedIn(){
    return this.userLogged.asObservable();
  }
}
