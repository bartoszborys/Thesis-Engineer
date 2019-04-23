import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatMessagesService } from 'src/app/services/chat-messages/chat-messages.service';
import { ChatMessageData } from 'src/app/models/ChatMessageData';
import { ChatPersonTileData } from 'src/app/models/ChatPersonTileData';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { SocketService } from 'src/app/services/socket/socket.service';
import { HubConnection } from '@aspnet/signalr';
import { Subscription } from 'rxjs';
import { SocketMessage } from 'src/app/models/backend-integration-models/SocketMessage';

@Component({
  selector: 'app-chat-messages-container',
  templateUrl: './chat-messages-container.component.html',
  styleUrls: ['./chat-messages-container.component.css']
})

export class ChatMessagesContainerComponent implements OnInit, OnDestroy {
  @Input() lastClicked : ChatPersonTileData;
  public texts : Array<ChatMessageData>;
  private chatSocket: HubConnection;
  private messagesSubscription: Subscription;
  
  constructor(private service : ChatMessagesService, private sockets: SocketService){}

  ngOnChanges() {
    this.messagesSubscription = this.service.getMessages(this.lastClicked.userId).subscribe(
      (response: Array<ChatMessageData>) => this.texts = response,
      (err) => console.error(err)
    );
  }

  ngOnInit() {
    this.configureChatSocket();
  }

  ngOnDestroy() {
    this.chatSocket.off("send");
    this.chatSocket.stop();
    this.messagesSubscription.unsubscribe();
  }

  private configureChatSocket() {
    debugger;
    this.chatSocket = this.sockets.connection('chat');
    
    this.chatSocket.on("send", (recivedMessage: SocketMessage)=>{
      if(recivedMessage.reciver == recivedMessage.sender){
        console.error("Everything is ok XD");
        return;
      }

      if(this.lastClicked.userId != recivedMessage.sender){
        alert('Another user snet message :D');
        return;
      }

      const parsedRecivedMessage: ChatMessageData = {
        message: recivedMessage.message,
        isMine: false,
        date: new Date().toJSON().slice(0,19).replace('T',' ').toString()
      };

      this.texts.push(parsedRecivedMessage);
    });

    this.chatSocket.start();
  }

  public handleMessage(message : string){
    const currentlyMessage: ChatMessageData = {
      message: message,
      isMine: true,
      date: new Date().toJSON().slice(0,19).replace('T',' ').toString()
    };
    this.texts.push(currentlyMessage);

    this.service.sendMessage(message, this.lastClicked.userId).subscribe(
      response => this.sendMessageSuccess(message),
      errorResponse => this.sendMessageError(currentlyMessage, errorResponse)
    );
  }
  
  private sendMessageError(currentlyMessage: ChatMessageData, errorResponse: any): void {
    const index = this.texts.indexOf(currentlyMessage);
    this.texts.splice(index, 1);
  }

  private sendMessageSuccess(message: string){
    this.chatSocket.send("send", {"message": message, "Reciver": this.lastClicked.userId});
  }
}
