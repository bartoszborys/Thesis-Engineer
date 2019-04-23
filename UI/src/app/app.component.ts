import { Component, OnInit } from '@angular/core';
import { JwtPropertiesService } from './services/jwt-properties/jwt-properties.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  navbarEnabled : boolean;

  constructor(private jwt: JwtPropertiesService){
  }

  ngOnInit(){
    this.jwt.updateRole();
  }
}