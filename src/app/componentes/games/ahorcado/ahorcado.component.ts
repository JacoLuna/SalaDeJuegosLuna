import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [MatButton],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.scss'
})
export class AhorcadoComponent {
  constructor(){
    console.log(this.letters);
  }
  letters = [
  {letter : 'a', img: 'assets/juegos/ahorcado/a-cuadrado.png'},
  {letter : 'b', img: 'assets/juegos/ahorcado/b-cuadrado.png'},
  {letter : 'c', img: 'assets/juegos/ahorcado/c-cuadrado.png'},
  {letter : 'd', img: 'assets/juegos/ahorcado/d-cuadrado.png'},
  {letter : 'e', img: 'assets/juegos/ahorcado/e-cuadrado.png'},
  {letter : 'f', img: 'assets/juegos/ahorcado/f-cuadrado.png'},
  {letter : 'g', img: 'assets/juegos/ahorcado/g-cuadrado.png'},
  {letter : 'h', img: 'assets/juegos/ahorcado/h-cuadrado.png'},
  {letter : 'i', img: 'assets/juegos/ahorcado/i-cuadrado.png'},
  {letter : 'j', img: 'assets/juegos/ahorcado/j-cuadrado.png'},
  {letter : 'k', img: 'assets/juegos/ahorcado/k-cuadrado.png'},
  {letter : 'l', img: 'assets/juegos/ahorcado/l-cuadrado.png'},
  {letter : 'm', img: 'assets/juegos/ahorcado/m-cuadrado.png'},
  {letter : 'n', img: 'assets/juegos/ahorcado/n-cuadrado.png'},
  {letter : 'o', img: 'assets/juegos/ahorcado/o-cuadrado.png'},
  {letter : 'p', img: 'assets/juegos/ahorcado/p-cuadrado.png'},
  {letter : 'q', img: 'assets/juegos/ahorcado/q-cuadrado.png'},
  {letter : 'r', img: 'assets/juegos/ahorcado/r-cuadrado.png'},
  {letter : 's', img: 'assets/juegos/ahorcado/s-cuadrado.png'},
  {letter : 't', img: 'assets/juegos/ahorcado/t-cuadrado.png'},
  {letter : 'u', img: 'assets/juegos/ahorcado/u-cuadrado.png'},
  {letter : 'v', img: 'assets/juegos/ahorcado/v-cuadrado.png'},
  {letter : 'w', img: 'assets/juegos/ahorcado/w-cuadrado.png'},
  {letter : 'x', img: 'assets/juegos/ahorcado/x-cuadrado.png'},
  {letter : 'y', img: 'assets/juegos/ahorcado/y-cuadrado.png'},
  {letter : 'z', img: 'assets/juegos/ahorcado/z-cuadrado.png'} ];

  word:string = "";
  secretWord = "palabra";

  letterSelected(letter: string){
    if (this.secretWord.includes(letter)) { 
      let letras = document.getElementsByClassName(letter);
      for (let index = 0; index < letras.length; index++) {
        letras[index].setAttribute("value", letter);
      }
      this.word += letter;
    } else { 
      console.log("No word characters found"); 
    }
  }
}
