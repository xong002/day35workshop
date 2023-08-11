import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../model/game';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient) { } //Must add HttpClientModule to imports

  getGames(limit: number, offset: number) : Observable<any>{
    const params = new HttpParams()
    .set('limit', limit)
    .set('offset', offset);

    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')

    return this.httpClient.get("http://localhost:8080/games",
      {params: params, headers: headers})
  }
}
