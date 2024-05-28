import { Component, OnInit, inject } from '@angular/core';
import { PreguntadosService } from '../../../services/apis/preguntados.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.scss'
})
export class PreguntadosComponent implements OnInit {
  preguntaSrv = inject(PreguntadosService);

  pregunta!:string;
  correct_answer!:string; 
  incorrect_answers :string[] = [];
  mensaje!: string;
  cargo: boolean = false;
  puntaje: number = 0;
  vidas: boolean[] = [true,true,true,true,true];
  
  constructor(){
  }

  ngOnInit(): void {
    this.jugar();
  }

  jugar(){
    this.pregunta = "";
    this.correct_answer = "";
    this.incorrect_answers = [];
    this.mensaje = "";
    this.vidas = [true,true,true,true,true];

    this.preguntaSrv.get().subscribe( e => {
      if(e.response_code == 0){
        this.pregunta = decodeURIComponent(e.results[0].question);
        this.correct_answer = decodeURIComponent(e.results[0].correct_answer);
        e.results[0].incorrect_answers.forEach((element: string) => {
          this.incorrect_answers.push(decodeURIComponent(element));
        });
        this.cargo = true;
      }
    })
  }
  responder(rta: string){
    if(rta == this.correct_answer){
      this.mensaje = "Correcta!";
      this.puntaje++;
    }else{
      this.mensaje = "Incorrecta!";  
      this.vidas.length = this.vidas.length-1;
    }

    if(this.vidas.length == 0){
      Swal.fire({
        icon: "error",
        title: "Que lastima!",
        text: "se te acabaron las vidas",
      });
      this.vidas = [true,true,true,true,true];
      this.puntaje = 0;
    }

    setTimeout(() => {
      this.jugar();
      this.cargo = false;
    }, 1500);
  }
}
