import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChatPersonTileData } from 'src/app/models/ChatPersonTileData';
import { ChatPersonService } from 'src/app/services/chat-person/chat-person.service';

@Component({
  selector: 'app-chat-person-container',
  templateUrl: './chat-person-container.component.html',
  styleUrls: ['./chat-person-container.component.css']
})

export class ChatPersonContainerComponent implements OnInit {
  @Output() lastClicked : EventEmitter<ChatPersonTileData> = new EventEmitter<ChatPersonTileData>();
  personsTileData : Array<ChatPersonTileData>;
  filteredPersonsTileData: Array<ChatPersonTileData>;

  constructor(private service : ChatPersonService) { }

  ngOnInit() {
    this.service.getPersonTileData().subscribe(
      response => {
        this.personsTileData = response;
        if(this.personsTileData.length){
          this.lastClicked.emit(this.personsTileData[0]);
        }
      },
      error => console.log(error)
    )
  }
  
  onChatTileClick(lastClickedIndex: number){
    this.lastClicked.emit( this.personsTileData[lastClickedIndex] );
  }
  
  onSearchClick(namePart: string){
    this.filteredPersonsTileData = ( namePart.length != 0 ) 
    ?
    this.personsTileData.filter( 
      x => x.name.toLocaleLowerCase().includes( namePart.toLowerCase() ) 
    )
    :
    null;
  }
}
