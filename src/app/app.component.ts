import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { DatePipe } from '@angular/common';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { ChatComponent } from './componentes/chat/chat.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, ChatComponent, MatProgressSpinnerModule],
  providers: [DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'salaDeJuegosLuna';
  userLogged!: boolean;
  userSession(session: boolean){
    this.userLogged = session;
  }
}
