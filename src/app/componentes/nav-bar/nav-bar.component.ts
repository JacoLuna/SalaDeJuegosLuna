import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  isLogged: boolean = false;
  mail!: string | null;
  @Output() userSessionEvent = new EventEmitter<boolean>();

  constructor(private Auth: AuthenticationService){}
  
  ngOnInit(): void {
    this.Auth.userLogged.subscribe(userLogged => {
      if(userLogged){
        this.isLogged = true;
        this.mail = userLogged.email;
        this.userSessionEvent.emit(true);
      }
    });
  }
  logOut(){
    this.userSessionEvent.emit(false);
    this.isLogged = false;
    this.Auth.logOut();
  }
}
