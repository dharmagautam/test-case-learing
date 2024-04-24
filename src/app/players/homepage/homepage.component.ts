import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Player } from '../../models/player';
import { PlayerService } from '../../service/player.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent implements OnInit {

  mumbai: Player[] = [];
  chennai: Player[] = [];
  rcb: Player[] = [];
  completeData: Player[] = [];

  constructor(private playerService: PlayerService) { }

  data: any;
  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.playerService.getAllPlayers().subscribe({
      next: players => {
        console.log(players);
        this.completeData = players;
        this.mumbai = this.completeData.filter(player => player.team === 'Mumbai');
        this.chennai = this.completeData.filter(player => player.team === 'Chennai');
        this.rcb = this.completeData.filter(player => player.team === 'Rcb');
      }
    });
  }
}
