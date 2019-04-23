import { Injectable, EventEmitter } from '@angular/core';
import { ChangePasswordData } from 'src/app/models/backend-integration-models/ChangePasswordData';
import { of, SubscriptionLike, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserDetails } from 'src/app/models/backend-integration-models/UserDetails';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "/api/user"
  detailsUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  getUserDetails(){
    return this.http.get<UserDetails>(environment.appUrl + this.url);
  }

  updateUserDetails(newDetails: UserDetails): Observable<any>{
    return this.http.patch(environment.appUrl + this.url, newDetails);
  }

  getPromoters(): Observable< Array<any> >{
    return this.http.get< Array<any> >(environment.appUrl + this.url + '/promoters');
  }

  getFieldsOfStudy(){
    return this.http.get< Array<any> >(environment.appUrl + this.url + '/studyFields');
  }

  changePassword(data: ChangePasswordData){
    return this.http.patch< Array<any> >(environment.appUrl + this.url + '/changePassword', data);
  }
}
