import { Component, inject } from '@angular/core';
import { DadosService } from '../../../services/games/dados/dados.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Dado } from '../../../classes/dado/dado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dados-locos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dados-locos.component.html',
  styleUrl: './dados-locos.component.scss'
})
export class DadosLocosComponent {

  dadosSrv = inject(DadosService);
  dados! : Dado[];
  valorElegido : number = -1; 
  valores: Dado[] = [];
  gano: boolean = false;
  tiradas: number = 0;
  
  constructor(){
    this.startGame(true);
    for (let index = 0; index < 6; index++) {
      this.valores[index] = new Dado(6);
      this.valores[index].setValue(index+1);
    }
  }
  
  startGame(firstThrow:boolean){
    this.dadosSrv.createDices();
    this.throwDices(firstThrow);
    this.tiradas = 0;
    this.valorElegido = -1;
    this.gano = false;
  }

  throwDices(firstThrow:boolean){
    if(this.valorElegido != -1){
      this.tiradas++;
      let contNum = 0;
      this.dadosSrv.throwDices();
      this.dados = this.dadosSrv.getDicesOnHand();
      this.dadosSrv.getDicesOnHandValue().forEach( e => {
        if(e == this.valorElegido){
          contNum++;
        }
      });
      if(contNum == 4){
        this.gano = true;
      }
    }else if(!firstThrow){
      Swal.fire({
        icon: "error",
        title: "Alto ahí!",
        text: "antes de tirar dados debe elegir un valor",
      });
    }
  }

  selectValue(value: number){
    this.valorElegido = value;
  }

  selectDice(index:number, isSelected: boolean){
    this.dados[index].setSelected(isSelected);
  }
}
