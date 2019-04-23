import { Injectable, EventEmitter } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { GlobalMessage } from 'src/app/models/backend-integration-models/GlobalMessage';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GlobalMessagesService {
  public editMessage: EventEmitter<{}> = new EventEmitter<{}>();
  private url = environment.appUrl + "/api/GlobalMessages";
  
  constructor(private http: HttpClient) { }

  get(promoter_id?: number): Observable<Array<GlobalMessage>>{
    const request_url = this.url + ( promoter_id ===null ? `/${promoter_id}` : "");
    return this.http.get<Array<GlobalMessage>>(request_url);
  }

  put(data: GlobalMessage): Observable<any>{
    return this.http.put(this.url, data);
  }
  
  patch(editedDetails: GlobalMessage):  Observable<any> {
    return this.http.patch<any>(this.url, editedDetails);
  }

  delete(deleteId: string): Observable<any>{
    return this.http.delete<any>(this.url + `/${deleteId}`);
  }

  getGlobalMessagesTypes(): Observable<any> {
    return of([
      {
        id: 'info',
        name: "Informacja"
      },
      {
        id: 'impo',
        name: "Ważne"
      },
      {
        id: 'crit',
        name: "Krytyczne"
      }
    ])
  }
}
