import { Component, Input } from '@angular/core';
import { Player } from '../../models/player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.css'
})
export class PlayerListComponent {

  @Input() playerList: Player[] | undefined;

}
