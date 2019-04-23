import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { ChatMessageData } from 'src/app/models/ChatMessageData';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  @Input() texts : Array<ChatMessageData>;
  
  constructor() {}
  
  ngAfterViewChecked(){
    this.scrollContainer.nativeElement.scrollIntoView({
      "behavior" : "auto", 
      "block" : "end", 
      "inline" : "end"
    });
  }

  ngOnInit(){
  }
}
  