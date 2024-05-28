import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [MatButton, MatButtonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.scss'
})
export class AhorcadoComponent implements OnInit{

  constructor(protected http: HttpClient){
  }
  ngOnInit(): void {
    
    this.http.get<any>('assets/juegos/ahorcado/palabras.json').subscribe(data => {
      this.palabras = data.palabras;
      this.startGame();
    });

  }
  
  palabras!:any;
  gameStarted: boolean = false;

  letters = [
  {letter : 'a', img: 'assets/juegos/ahorcado/letras/a-cuadrado.png', selected: false},
  {letter : 'b', img: 'assets/juegos/ahorcado/letras/b-cuadrado.png', selected: false},
  {letter : 'c', img: 'assets/juegos/ahorcado/letras/c-cuadrado.png', selected: false},
  {letter : 'd', img: 'assets/juegos/ahorcado/letras/d-cuadrado.png', selected: false},
  {letter : 'e', img: 'assets/juegos/ahorcado/letras/e-cuadrado.png', selected: false},
  {letter : 'f', img: 'assets/juegos/ahorcado/letras/f-cuadrado.png', selected: false},
  {letter : 'g', img: 'assets/juegos/ahorcado/letras/g-cuadrado.png', selected: false},
  {letter : 'h', img: 'assets/juegos/ahorcado/letras/h-cuadrado.png', selected: false},
  {letter : 'i', img: 'assets/juegos/ahorcado/letras/i-cuadrado.png', selected: false},
  {letter : 'j', img: 'assets/juegos/ahorcado/letras/j-cuadrado.png', selected: false},
  {letter : 'k', img: 'assets/juegos/ahorcado/letras/k-cuadrado.png', selected: false},
  {letter : 'l', img: 'assets/juegos/ahorcado/letras/l-cuadrado.png', selected: false},
  {letter : 'm', img: 'assets/juegos/ahorcado/letras/m-cuadrado.png', selected: false},
  {letter : 'n', img: 'assets/juegos/ahorcado/letras/n-cuadrado.png', selected: false},
  {letter : 'o', img: 'assets/juegos/ahorcado/letras/o-cuadrado.png', selected: false},
  {letter : 'p', img: 'assets/juegos/ahorcado/letras/p-cuadrado.png', selected: false},
  {letter : 'q', img: 'assets/juegos/ahorcado/letras/q-cuadrado.png', selected: false},
  {letter : 'r', img: 'assets/juegos/ahorcado/letras/r-cuadrado.png', selected: false},
  {letter : 's', img: 'assets/juegos/ahorcado/letras/s-cuadrado.png', selected: false},
  {letter : 't', img: 'assets/juegos/ahorcado/letras/t-cuadrado.png', selected: false},
  {letter : 'u', img: 'assets/juegos/ahorcado/letras/u-cuadrado.png', selected: false},
  {letter : 'v', img: 'assets/juegos/ahorcado/letras/v-cuadrado.png', selected: false},
  {letter : 'w', img: 'assets/juegos/ahorcado/letras/w-cuadrado.png', selected: false},
  {letter : 'x', img: 'assets/juegos/ahorcado/letras/x-cuadrado.png', selected: false},
  {letter : 'y', img: 'assets/juegos/ahorcado/letras/y-cuadrado.png', selected: false},
  {letter : 'z', img: 'assets/juegos/ahorcado/letras/z-cuadrado.png', selected: false} ];

  tries = [
    {letter: '', img: "assets/juegos/ahorcado/partes/1 tries.png"},
    {letter: '', img: "assets/juegos/ahorcado/partes/2 tries.png"},
    {letter: '', img: "assets/juegos/ahorcado/partes/3 tries.png"},
    {letter: '', img: "assets/juegos/ahorcado/partes/4 tries.png"},
    {letter: '', img: "assets/juegos/ahorcado/partes/5 tries.png"},
    {letter: '', img: "assets/juegos/ahorcado/partes/ahorcado.png"},
  ]

  fails: number = 0;
  secretWord = "";
  wordArray = ['']
  secretWordArray = [''];

  startGame(){
    this.gameStarted = true;
    this.secretWord = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.secretWordArray = this.secretWord.split("");
  }
  
  gameEnded(){
    if(this.fails > 6){
      Swal.fire({
        icon: "error",
        title: "perdiste",
        text: "No adivinaste la palabra",
        footer: "la palabra era " + this.secretWord,
      });
    }else{
      Swal.fire({
        title: "Muy bien!",
        text: "Adivinaste la palabra!",
        icon: "success"
      });
    }

    this.gameStarted = false;
    this.secretWord = "";
    this.fails = 0;
    this.wordArray.length = 0;

    for (let index = 0; index < this.tries.length; index++) {
      this.tries[index].letter = '';
    }
    for (let index = 0; index < this.letters.length; index++) {
      this.letters[index].selected = false;
    }
  }

  letterSelected(letter: string, index: number){
    if(this.gameStarted){
      this.letters[index].selected = true;

      if (this.secretWord.includes(letter)) { 
        let letras = document.getElementsByClassName(letter);
        for (let index = 0; index < letras.length; index++) {
          letras[index].setAttribute("value", letter);
        }
        this.secretWordArray.forEach( (e, index) => {
          if(letter == e){
            this.wordArray[index] = e;
          }
        });
        console.log(this.wordArray);
        console.log(this.secretWordArray);
        let cont = 0;
        this.wordArray.forEach( (e, index) => {
          if(e == this.secretWord[index]){
            cont++;
          }
        });

        if(cont == this.secretWordArray.length){
          this.gameEnded();
        }

      } else { 
        if(this.fails != 6){
          for (let i = 0; i < this.tries.length; i++) {
            if(this.tries[i].letter == ''){
              this.tries[i].letter = this.letters[index].img;
              this.fails++;
              break;
            }
          }
        }else{
          this.fails++;
          this.gameEnded();
        }
      }
    }
  }
}