import { Component, OnInit, inject } from '@angular/core';
import { MazoService } from '../../../services/games/mazo/mazo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.scss'
})
export class MayorMenorComponent implements OnInit{  
  mazoSrv = inject(MazoService);  
  currentCard: string =" ";
  nextCard!: string;
  message!: string;
  deckLength!: number;
  gano!: boolean;
  answer: boolean = true; 
  puntaje: number = 0;
  vidas: boolean[] = [true,true,true,true,true];

  constructor(){}

  ngOnInit(){
    this.drawInitialCard();
    this.answer = false;
  }

  drawInitialCard(){
    this.currentCard = this.mazoSrv.drawCard();
    this.deckLength = this.mazoSrv.getDeckLength();
    this.nextCard = this.mazoSrv.drawCard();
  }

  guess(mayor:boolean){
    
    const currentCardValue = this.getCardValue(this.currentCard);
    const nextCardValue = this.getCardValue(this.nextCard);

    if ((mayor && nextCardValue >= currentCardValue) || (!mayor && nextCardValue <= currentCardValue)) {
      this.message = 'Correcta!';
      this.gano = true;
      this.puntaje++;
    } else {
      this.message = 'Incorrecta!';
      this.gano = false;
      this.vidas.length = this.vidas.length-1;
    }
    this.answer = true;

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
        this.currentCard = this.nextCard;
        this.nextCard = this.mazoSrv.drawCard();
        this.deckLength = this.mazoSrv.getDeckLength();
        this.message = '';
        if(this.deckLength == 0){
          this.mazoSrv.startGame();
        }
        this.answer = false;
      }, 1500);
    
  }

  getCardValue(card: string): number {
    const value = card.split(' ')[0];
    if (value === 'J') return 11;
    if (value === 'Q') return 12;
    if (value === 'K') return 13;
    if (value === 'A') return 14;
    return parseInt(value, 10);
  }
  getCardStringValue(card: string): string {
    const value = card.split(' ')[0];
    return value;
  }
  getCardPalo(card: string): string {
    const value = card.split(' ')[1];
    return value;
  }
}
