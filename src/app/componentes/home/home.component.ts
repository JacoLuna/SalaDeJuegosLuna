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
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private Auth: AuthenticationService) {}
}
