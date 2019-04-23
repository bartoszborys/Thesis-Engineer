import { Component, OnInit } from '@angular/core';
import { ThesisDetails } from 'src/app/models/backend-integration-models/ThesisDetails';
import { ThesisService } from '../../services/thesis/thesis.service';
import { HttpResponse } from '@angular/common/http/http';
import { JwtPropertiesService } from 'src/app/services/jwt-properties/jwt-properties.service';

@Component({
  selector: 'app-thesis',
  templateUrl: './thesis.component.html',
  styleUrls: ['./thesis.component.css']
})
export class ThesisComponent implements OnInit {
  promoter: boolean = sessionStorage.getItem('role') == "PRO";
  constructor(){ }

  ngOnInit(){

  }
}
