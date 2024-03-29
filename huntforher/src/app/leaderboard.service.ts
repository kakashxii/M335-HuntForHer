import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private apiUrl = 'https://randomuser.me/api/?results=10';

  constructor(private http: HttpClient) { }

  getLeaderboard(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
