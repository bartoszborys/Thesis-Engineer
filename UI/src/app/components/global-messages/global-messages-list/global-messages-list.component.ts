import { Component, OnInit } from '@angular/core';
import { GlobalMessagesService } from 'src/app/services/global-messages/global-messages.service';
import { faTrashAlt, faPenSquare, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { GlobalMessage } from 'src/app/models/backend-integration-models/GlobalMessage';

@Component({
  selector: 'app-global-messages-list',
  templateUrl: './global-messages-list.component.html',
  styleUrls: ['./global-messages-list.component.css']
})
export class GlobalMessagesListComponent implements OnInit {
  globalMessages: Array<GlobalMessage>;
  promoter: boolean = sessionStorage.getItem('role') == "PRO";
  removeMessageIcon: IconDefinition = faTrashAlt;
  editMessageIcon: IconDefinition = faPenSquare;

  constructor(private service: GlobalMessagesService) { }

  ngOnInit() {
    this.service.get().subscribe( 
      (data: Array<GlobalMessage>) => {
        if(data !== null && data.length > 0){
          this.globalMessages = data;
        }
        else{
          this.globalMessages = [{
            id: "",
            senderId: "",
            header: "",
            message: "Nie ma aktualnie żadnej wiadomości",
            typeId: "info"
          }]
        }
      },
      error => alert(JSON.stringify(error))
    );
  }

  getCorrectClass(type): string{
    switch(type){
      case 'info':
        return 'card--info-color';

      case 'crit':
        return 'card--critical-color';

      case 'impo':
        return 'card--important-color';
    }
  }

  public editMessage(messageDetails): void{
    this.service.editMessage.emit(messageDetails);
  }

  public deleteMessage(messageDetails: GlobalMessage){
    this.service.delete(messageDetails.id).subscribe(
      callback => this.globalMessages.splice( this.globalMessages.indexOf(messageDetails), 1),
      error => alert(error)
    );
  }

  ngOnDestroy(){
  }
}
