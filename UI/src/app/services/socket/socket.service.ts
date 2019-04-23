import { Injectable } from '@angular/core';
import { HttpTransportType, HubConnectionBuilder, IHttpConnectionOptions, HubConnection } from '@aspnet/signalr';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  hubUrl: string = '/api/hub/';
  constructor(private cookie: CookieService) { }

  public connection(to: string): HubConnection{
    return new HubConnectionBuilder()
    .withUrl( this.getUrl(to), this.getSettings() )
    .build();
  }

  private getUrl(to: string): string{
    return `${environment.appUrl}${this.hubUrl}${to}`;
  }

  private getSettings(): IHttpConnectionOptions{
    return {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
      accessTokenFactory: (): string => this.cookie.get('Authorization')
    };
  }
}
