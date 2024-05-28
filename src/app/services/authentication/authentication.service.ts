import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../classes/user/user/user';
import { SessionService } from '../session/session.service';
import { Session } from '../../interfaces/session';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({ 
  providedIn: 'root',
})
export class AuthenticationService{

  userLogged: Observable<firebase.User | null>;
  private userCredential!: any;

  constructor(public ngFireAuth: AngularFireAuth, public msg: SessionService, private router: Router) {
    this.userLogged = this.ngFireAuth.authState;
  }
  
  async loginUser(email: string, password: string) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)
    .then( (credenciales) => {
      this.userCredential = credenciales.credential;
      const session: Session = {
        gmail: email,
        fechaIngreso: new Date(),
      }
      this.msg.agregarMensaje(session).
      then( () => {
        console.log("se guardó exitosamente la info");
      }).
      catch ( (err) => {
        console.log("ERROR" + err);
      });
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
    this.router.navigate(['/home']);
    this.ngFireAuth.signOut();
  }

  getAuthToken(){
    return this.ngFireAuth.idToken;
  }
}
