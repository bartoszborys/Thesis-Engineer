import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-global-message',
  templateUrl: './add-global-message.component.html',
  styleUrls: ['./add-global-message.component.css']
})
export class AddGlobalMessageComponent implements OnInit {
  buttonIcon: any = faEnvelope;
  constructor() { }

  ngOnInit() {
  }
}
