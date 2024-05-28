import { Injectable } from '@angular/core';
import { Dado } from '../../../classes/dado/dado';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  private selectedDice!: Dado;
  private diceOnHand: Dado[] = [];
  private thrownDices!: Dado[];
  private dicesAmount: number = 4;
  private dicesFaces: number = 6;

  constructor() {
    this.createDices()
  }
  createDices(){
    for (let index = 0; index < this.dicesAmount; index++) {
      this.diceOnHand[index] = new Dado(this.dicesFaces);
    }
  }
  throwDices(){
    this.diceOnHand.forEach( dice => {
      if(!dice.isSelected())
        dice.throw();
    });
  }
  
  selectDices(selectedArray: boolean[]){
    this.diceOnHand.forEach( (dice, index) => {
      if(selectedArray[index]){
        dice.setSelected(true);
      }
    });
  }

  getDicesOnHandValue():number[]{
    let values:number[] = []; 
    this.diceOnHand.forEach( dice => {
      values.push(dice.getValue());
    })
    return values;
  }

  getDicesOnHand():Dado[]{
    return this.diceOnHand;
  }
}
