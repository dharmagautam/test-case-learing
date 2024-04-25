import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from "../models/player";
import { AppConstants } from "../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  
  
  constructor(private http: HttpClient) { }
  
  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${AppConstants.apiServerUrl}/players`);
  }
}
