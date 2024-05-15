import { Component } from '@angular/core';
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
  constructor(private Auth: AuthenticationService){}
  
  ngOnInit(): void {
    this.Auth.userLogged.subscribe(userLogged => {
      if(userLogged){
        this.isLogged = true;
        this.mail = userLogged.email;
      }
    });
  }
  logOut(){
    this.Auth.logOut();
    this.isLogged = false;
  }
}
