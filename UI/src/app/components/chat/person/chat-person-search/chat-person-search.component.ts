import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-person-search',
  templateUrl: './chat-person-search.component.html',
  styleUrls: ['./chat-person-search.component.css']
})
export class ChatPersonSearchComponent implements OnInit {
  @Output() searchValue : EventEmitter<string> = new EventEmitter<string>(); 

  constructor() { }

  ngOnInit() {
  }

  handleSearchClick(text : string){
    this.searchValue.emit( text.trim() );
  }
}
