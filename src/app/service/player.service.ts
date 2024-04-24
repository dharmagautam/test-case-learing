import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from "../models/player";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiServerUrl = 'http://localhost:9000';
  constructor(private http: HttpClient) { }
  
  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiServerUrl}/players`);
  }
}
