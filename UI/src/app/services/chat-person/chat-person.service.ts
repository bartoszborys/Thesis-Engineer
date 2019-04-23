import { Injectable } from '@angular/core';
import { ChatPersonTileData } from '../../models/ChatPersonTileData';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatPersonService {
  constructor(private http : HttpClient) {}
  url : string = '/api/messages/graduates';

  getPersonTileData() : Observable<Array<ChatPersonTileData>>{
    return this.http.get<Array<ChatPersonTileData>>(environment.appUrl + this.url);
  }
}
