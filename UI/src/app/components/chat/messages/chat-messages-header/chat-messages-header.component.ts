import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChatPersonTileData } from 'src/app/models/ChatPersonTileData';

@Component({
  selector: 'app-chat-messages-header',
  templateUrl: './chat-messages-header.component.html',
  styleUrls: ['./chat-messages-header.component.css']
})
export class ChatMessagesHeaderComponent implements OnInit, OnChanges {

  @Input() selectedPersonData : ChatPersonTileData;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
  }
}
