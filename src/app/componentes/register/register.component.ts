import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  
  correo!: string;
  clave!: string;
  clave2!: string;
  err: boolean = false;
  toastScv = inject(ToastrService);

  constructor(public Auth: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
  }
  onClick() {
    this.correo =  "usuario1@gmail.com";
    this.clave =  "123456";
    this.clave2 =  "123456";
  }

  async register() {
    if(this.clave == this.clave2){

      await this.Auth.register( this.correo, this.clave).
      then(() => {
        this.Auth.loginUser( this.correo, this.clave).
        then( () => {
          this.router.navigate(['/home']);
        })
      }).catch( (e) => {
        this.err = true
        console.log(e);
        this.toastScv.error('Ya existe una cuenta con ese mail','error', {
          positionClass: 'toast-bottom-center'
        });
      });
    }else{
      console.log("las contraseñas no coinciden");
      this.toastScv.warning('las contraseñas no coinciden', 'error', {
        positionClass: 'toast-bottom-center'
      });
    }
  }
}
