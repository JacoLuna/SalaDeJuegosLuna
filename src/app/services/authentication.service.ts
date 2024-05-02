import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../classes/user/user';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from './message.service';
import { Message } from '../interfaces/message';

@Injectable({ 
  providedIn: 'root',
})
export class AuthenticationService{

  user!: User;
  private userLogged: BehaviorSubject<User> = new BehaviorSubject<User>(this.user);
  userCredential: any = null;

  constructor(public ngFireAuth: AngularFireAuth, public msg: MessageService) {}

  
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
        this.userLogged.next(this.user);
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

  get userLoggedIn(){
    return this.userLogged.asObservable();
  }
}
