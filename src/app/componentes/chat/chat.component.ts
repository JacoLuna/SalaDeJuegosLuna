import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../../classes/user/user/user';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat/chat.service';
import { chatMsg } from '../../interfaces/chatMsg';
import { UserService } from '../../services/user/user.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  authService = inject(AuthenticationService);
  chatService = inject(ChatService);
  userService = inject(UserService);

  messages: chatMsg[] = new Array();
  users: User[] = new Array();
  public usuarioLogeado: boolean = false;
  public chat: boolean = false;
  protected nuevoMensaje: string = '';

  protected user!: User;

  constructor() {}

  ngOnInit(): void {
    this.authService.userLogged.subscribe((userLogged) => {
      if (userLogged) {
        this.userService.users.subscribe((r) => {
          this.usuarioLogeado = true;
          this.users = r;
          this.users.forEach(element => {
            if(element.uid == userLogged.uid){
              this.user = new User(element.name, element.surname, element.alias, element.correo, element.uid);
            }
          });
          
        });
      }
    });

    this.chatService.chats.subscribe((r) => {
      this.messages = r;
      this.messages.sort((a, b) => {
        if (a.time > b.time) {
          return 1;
        }
        if (a.time < b.time) {
          return -1;
        }
        return 0;
      });
    });
    
    setTimeout(() => {
      this.scrollToLastElementByClass();
    }, 1);
  }

  enviarMensaje() {
    let msg: chatMsg = {
      message: this.nuevoMensaje,
      time: Date.now(),
      uid: this.user.uid,
    };
    if (msg.message == '') return;

    this.messages.push(msg);

    this.nuevoMensaje = '';
    this.chatService.msgSended(msg);
    setTimeout(() => {
      this.scrollToLastElementByClass();
    }, 1);
  }

  scrollToLastElementByClass() {
    let elements = document.getElementsByClassName('msg');
    let lastElement: any = elements[elements.length - 1];
    let toppos = lastElement.offsetTop;
    document.getElementById('msgContainer')!.scrollTop = toppos;
  }

  parsedTime(mls:number){
    let date = new Date(mls);
    return date.getHours().toString() + ":" + date.getMinutes().toString();
  }
}
