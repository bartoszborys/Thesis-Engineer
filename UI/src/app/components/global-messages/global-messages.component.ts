import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-messages',
  templateUrl: './global-messages.component.html',
  styleUrls: ['./global-messages.component.css']
})
export class GlobalMessagesComponent implements OnInit {
  promoter: boolean = sessionStorage.getItem('role') == "PRO";
  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(){
  }
}