import { Component, OnInit } from '@angular/core';
import { DynamicFormCardDetails } from 'src/app/models/DynamicFormCardDetails';
import { PreAppRoutesDefinition } from 'src/app/lib/PreAppRoutesDefinition';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  loginCardDetails : DynamicFormCardDetails;
  registrationCardDetails : DynamicFormCardDetails;

  loginClasses = {
    "active-sx" : true,
    "inactive-sx" : false
  }

  registrationClasses = {
    "active-sx" : false,
    "inactive-sx" : true
  }

  constructor() { }

  ngOnInit(){
   
  }
  
  changeFormHandler(stateDescriptor: string){
    switch(stateDescriptor){
      case PreAppRoutesDefinition.Login.toString():
        this.loginClasses["active-sx"]=true;
        this.loginClasses["inactive-sx"]=false;
        this.registrationClasses["inactive-sx"]=true;
        this.registrationClasses["active-sx"]=false;
        break;

      case PreAppRoutesDefinition.Registration.toString():
        this.loginClasses["inactive-sx"]=true;
        this.loginClasses["active-sx"]=false;
        this.registrationClasses["inactive-sx"]=false;
        this.registrationClasses["active-sx"]=true;
        break;

      case PreAppRoutesDefinition.PasswordRecovery.toString():
        this.loginClasses["inactive-sx"]=true;
        this.loginClasses["active-sx"]=false;
        this.registrationClasses["inactive-sx"]=true;
        this.registrationClasses["active-sx"]=false;    
        break;
      
      default:
        throw new Error(`Unknown value >> '${stateDescriptor.toString()}'`)
    }
  }
}
