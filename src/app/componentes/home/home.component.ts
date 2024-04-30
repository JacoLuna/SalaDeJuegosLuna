import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { User } from '../../classes/user/user';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [LoginComponent],
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  isLogged: boolean = false;
  user: User = new User();
  constructor(private Auth: AuthenticationService){}
  
  ngOnInit(): void {
    this.Auth.userLoggedIn.subscribe(user => {
      console.log(user);
      this.isLogged = true;
      this.user = user;
    });
  }
  logOut(){
    this.Auth.logOut();
  }

}
