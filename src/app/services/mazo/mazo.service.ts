import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MazoService {
  private palos = ['Corazon', 'Diamante', 'Trebol', 'Picas'];
  private valores = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  private mazo: string[] = [];

  constructor() {
    this.startGame();
  }
  
  startGame(){
    this.createDeck();
    this.shuffleDeck();
  }

  private createDeck() {
    this.mazo = [];
    this.palos.forEach( palo => {
      this.valores.forEach( valor => {
        this.mazo.push(valor + " " + palo);
      })
    })
  }

  private shuffleDeck() {
    for (let i = this.mazo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.mazo[i], this.mazo[j]] = [this.mazo[j], this.mazo[i]];//Fisher-Yates shuffle algorithm
    }
  }

  drawCard() {
    let card = this.mazo.pop();
    if(!card){
      card = "";
    }
    return card;
  }

  getDeckLength() {
    return this.mazo.length;
  }
}
