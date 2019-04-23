import { Component, OnInit } from '@angular/core';
import { ChatPersonTileData } from '../../models/ChatPersonTileData';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  lastClickedPersonTileData : ChatPersonTileData;
  constructor() { }

  ngOnInit() {
  }

  handleClickedPersonTile(_lastClickedPersonTileData : ChatPersonTileData){
    this.lastClickedPersonTileData = _lastClickedPersonTileData;
  }
}
