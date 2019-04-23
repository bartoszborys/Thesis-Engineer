import { Injectable } from '@angular/core';
import { ThesisDetails } from 'src/app/models/backend-integration-models/ThesisDetails';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { JwtPropertiesService } from '../jwt-properties/jwt-properties.service';
import { ThesisCommentDetails } from 'src/app/models/backend-integration-models/ThesisCommentDetails';

@Injectable({
  providedIn: 'root'
})
export class ThesisService {
  thesisUrl: string = environment.appUrl + "/api/Thesis";
  constructor(private http: HttpClient, private jwt: JwtPropertiesService) { }

  public get(graduate_id: string): Observable<ThesisDetails>{
    return this.http.get<ThesisDetails>(this.thesisUrl + `/${graduate_id}`);
  }

  public getMy(): Observable<ThesisDetails>{
    return this.http.get<ThesisDetails>(this.thesisUrl + `/${this.jwt.getCurrentUserId()}`);
  }

  public put(): Observable<any> {
    return this.http.put<ThesisDetails>(this.thesisUrl, {});
  }

  public sendFile(fileAsArry: string): Observable<any> {
    return this.http.post<any>(this.thesisUrl + "/upload", {base64WithHeader: fileAsArry});
  }

  public sendFileAsPromoter(graduate_id: string, fileAsArry: string): Observable<any> {
    return this.http.post<any>(this.thesisUrl + `/upload/${graduate_id}`, {base64WithHeader: fileAsArry});
  } 

  public getGraduatesList(): Observable<any> {
    return this.http.get<any>(this.thesisUrl + "/graduates", {});
  }

  public downloadFileAsGraduate(role: string): Observable<any> {
    return this.http.get<any>(this.thesisUrl + `/download/${role}`);
  }

  public downloadFileAsPromoter(graduate_id: string, role: string): Observable<any> {
    return this.http.get<any>(this.thesisUrl + `/download/${graduate_id}/${role}`);
  }

  public changeState(graduate_id: string, state: string): Observable<any>{
    return this.http.patch<any>(this.thesisUrl + `/state/${graduate_id}/${state}`, {});
  }

  public updateGrades(graduate_id: string, grades_values: any): Observable<any> {
    return this.http.patch<any>(this.thesisUrl + `/grade/${graduate_id}`, grades_values);
  }

  public newComment(graduate_id: string, message: ThesisCommentDetails): Observable<any>{
    return this.http.put<any>(this.thesisUrl + `/comment/${graduate_id}`, message);
  }

}