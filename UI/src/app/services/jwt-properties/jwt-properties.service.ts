import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as jwtDecoder from 'jwt-decode';
import { JwtDetails } from 'src/app/models/JwtDetails';

@Injectable({
  providedIn: 'root'
})
export class JwtPropertiesService {
  JwtDetails : JwtDetails;

  constructor(private cookies: CookieService) { 
    this.encodeCurrentToken();
  }
  
  private encodeCurrentToken(): void{
    try{
      this.JwtDetails = jwtDecoder(this.cookies.get("Authorization"));
    }catch(e){
      this.JwtDetails = {
        nameid: null,
        unique_name: null,
        role: null
      };
    }
  }

  public set(token: string): void{
    this.cookies.set("Authorization", token);
    this.encodeCurrentToken();
  }

  public getCurrentUserId(): string{
    return this.JwtDetails.nameid;
  }

  public getCurrentUserEmail(): string{
    return this.JwtDetails.unique_name;
  }

  public updateRole(): any {  
    sessionStorage.setItem( "role", this.getRole() );
  }
  
  private getRole(): string{
    return this.JwtDetails.role;
  }
}
