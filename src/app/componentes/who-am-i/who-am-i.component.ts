import { Component } from '@angular/core';

@Component({
  selector: 'app-who-am-i',
  standalone: true,
  imports: [],
  templateUrl: './who-am-i.component.html',
  styleUrl: './who-am-i.component.scss'
})
export class WhoAmIComponent {
  protected name: string = "A ";
  protected age: string = "A ";
  protected fav_thing: string = "A ";
}
