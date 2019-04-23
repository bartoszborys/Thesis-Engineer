import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-messages-text-write',
  templateUrl: './chat-messages-text-write.component.html',
  styleUrls: ['./chat-messages-text-write.component.css']
})
export class ChatMessagesTextWriteComponent implements OnInit {
  @Output() message : EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  handleKeydown(event : KeyboardEvent, input : HTMLTextAreaElement){
    const enterCode = 13;
    if(event.keyCode == enterCode){
      this.sendMessage(input);
    }
  }

  sendMessage(input : HTMLTextAreaElement){
    if(input.value == "" || input.value == undefined){
      return;
    }

    this.message.emit(input.value);
    input.value = "";
  }

}
