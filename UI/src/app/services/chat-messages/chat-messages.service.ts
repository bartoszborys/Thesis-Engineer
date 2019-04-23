import { Injectable } from '@angular/core';
import { ChatMessageData } from 'src/app/models/ChatMessageData';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { JwtPropertiesService } from '../jwt-properties/jwt-properties.service';
import { SendMessageData } from 'src/app/models/backend-integration-models/SendMessagaData';

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {
  getConversationPath : string = "/api/messages/conversation";
  sendPath : string = "/api/messages/send";

  constructor(private http : HttpClient, private jwt: JwtPropertiesService) { }

  sendMessage(message: string, toUser: number): Observable<any>{
    const MessageToSend: SendMessageData = {
      message: message,
      reciver: toUser.toString(),   
      sender: this.jwt.getCurrentUserId()
    }
    
    return this.http.post<any>(environment.appUrl + this.sendPath, MessageToSend);
  }

  getMessages(withUser: number) : Observable<Array<ChatMessageData>>{
    return this.http.get<Array<ChatMessageData>>(`${environment.appUrl}${this.getConversationPath}?reciverId=${withUser}&senderId=${this.jwt.getCurrentUserId()}`);
  }
}
