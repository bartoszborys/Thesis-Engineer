import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loggedState : boolean;
  path : string = "/api/general/authorize";
 

  constructor(private http : HttpClient, private router : Router){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Observable<boolean> | Promise<boolean> | boolean {
    const guardCallback = new Subject<boolean>();
    this.http.get<boolean>(environment.appUrl + this.path).subscribe(
      (data) => {
        guardCallback.next(true);
      },
      (err) =>{
        this.router.navigate(['/login']);
        guardCallback.next(err);
      }
    );

    return guardCallback.asObservable();
  }
}