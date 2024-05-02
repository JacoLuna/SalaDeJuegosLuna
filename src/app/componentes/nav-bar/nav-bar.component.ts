import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../classes/user/user';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  isLogged: boolean = false;
  user: User = new User();
  constructor(private Auth: AuthenticationService){}
  
  ngOnInit(): void {
    this.Auth.userLoggedIn.subscribe(user => {
      console.log(user);
      this.isLogged = true;
      this.user = user;
    });
    this.logOut();
  }
  logOut(){
    this.Auth.logOut();
    this.isLogged = false;
  }
}
