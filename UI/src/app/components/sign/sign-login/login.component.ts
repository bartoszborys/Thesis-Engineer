import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login/login.service';
import { LoginRequestDetails } from '../../../models/LoginRequestDetails';
import { UserCredentials } from '../../../models/UserCredentials';
import { DynamicFormCardDetails } from '../../../models/DynamicFormCardDetails';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtPropertiesService } from 'src/app/services/jwt-properties/jwt-properties.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() changeForm: EventEmitter<string> = new EventEmitter<string>();
  public cardDetails : DynamicFormCardDetails;

  private codeMessage = {
    0 : "Server not responding, please try again later.",
    400 : "Username or password is invalid",
    500 : "Our database is in trouble, please try again.",
    501 : "Our server is in trouble, please try again.",
  }

  constructor(
    private service : LoginService, 
    private jwt : JwtPropertiesService,
    private router : Router
  ) { }

  ngOnInit() {
    this.cardDetails = this.service.getCardDetails()
  }

  dispatchChangeEvent(eventName: string): void{
    this.changeForm.emit(eventName);
  }

  public login(submittedFormData : UserCredentials){
    this.cardDetails.isLoading = true;
    this.service.getToken( submittedFormData ).subscribe(
      (token : LoginRequestDetails) => this.loginCorrect(token),
      (error : HttpErrorResponse) => this.handleError(error.status)
    )
  }

  private handleError(errorCode: number) : any {
    this.cardDetails.isLoading = false;
    this.cardDetails.serverAlertMessage = this.codeMessage[errorCode];
  }
  
  private loginCorrect(details : LoginRequestDetails) : any {
    this.cardDetails.isLoading = false;
    this.jwt.set(details.token);
    this.jwt.updateRole();
    this.router.navigate(['/messages']);
  }
}
