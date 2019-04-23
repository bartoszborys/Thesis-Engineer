import { Component, OnInit, Input, EventEmitter, Output, HostListener, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ChatPersonTileData } from 'src/app/models/ChatPersonTileData';

@Component({
  selector: 'app-chat-person-tile',
  templateUrl: './chat-person-tile.component.html',
  styleUrls: ['./chat-person-tile.component.css']
})
export class ChatPersonTileComponent implements OnInit, AfterViewInit  {
  @ViewChild("paintArea") paintArea : ElementRef;
  @Input() personData : ChatPersonTileData;
  
  constructor() { }

  ngOnInit() { }
  
  ngAfterViewInit(){
    if(this.paintArea!=undefined){
      this.paintLetterProfileImage();
    }
  }

  private paintLetterProfileImage(){
    const context = (<HTMLCanvasElement>this.paintArea.nativeElement).getContext('2d');
    const centerX = this.paintArea.nativeElement.width / 2;
    const centerY = this.paintArea.nativeElement.height / 2;
    const radius = this.paintArea.nativeElement.height;

    context.beginPath();
    context.fillStyle = this.getRandomColor();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.strokeStyle = '#ffffff';
    context.font = 'bold 5em Calibri';
    context.textAlign = 'center';
    context.fillStyle = this.getRandomColor();
    context.textBaseline = "middle";

    const text : string = this.personData.name[0] + this.personData.name.split(" ")[1][0];
    context.fillText( text, centerX, centerY );
    context.stroke();
  }

  private getRandomColor(){
    return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
  }
}
