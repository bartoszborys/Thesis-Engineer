import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/lib/AccountManagmentStates';

@Component({
  selector: 'app-account-managment',
  templateUrl: './account-managment.component.html',
  styleUrls: ['./account-managment.component.css']
})

export class AccountManagmentComponent implements OnInit {
  public windowStateTypes : typeof State = State;
  public windowState: State = this.windowStateTypes.EMPTY;
  public windowHeader: string;
  public newProfileImage: string | ArrayBuffer;

  constructor() { }

  ngOnInit() { }

  changeWindowState(to: State): void{
    this.windowState = to;
    this.changeWindowHeader(to);
  }

  public newProfile(file: string | ArrayBuffer): void{
    this.newProfileImage = file;
  }

  changeWindowHeader(to: State): void{
    switch(to){
      case this.windowStateTypes.PASSWORD:
      case this.windowStateTypes.DETAILS:
        this.windowHeader = "Zarządzaj swoim kontem";
        return;
      
      case this.windowStateTypes.THESIS:
        this.windowHeader = "Your thesis details"
        return;

      default:
        throw new Error(`Unknown state >>'${to}'`);
        
    }
  }
}
