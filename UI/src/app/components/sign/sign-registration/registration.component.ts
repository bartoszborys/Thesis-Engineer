import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RegistrationService } from '../../../services/registration/registration.service';
import { DynamicFormCardDetails } from 'src/app/models/DynamicFormCardDetails';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { UserCredentials } from 'src/app/models/UserCredentials';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @Output() changeForm: EventEmitter<string> = new EventEmitter<string>();
  cardDetails : DynamicFormCardDetails;
  constructor(private service : RegistrationService, private router: Router) { }

  ngOnInit() {
    this.cardDetails = this.service.getCardDetails();
  }

  register(registrationData){
    this.cardDetails.isLoading = true;
    const parsedData: UserCredentials = this.parseToCorrectFormat(registrationData);
    this.service.register(parsedData).pipe( map(data => `{"message" : ${data}}`) ).subscribe(
      (response : string) => this.handleCorrectRegistration(response),
      (err) => this.handleRegistrationError(err)
    );
  }

  parseToCorrectFormat(data): UserCredentials{
    return {
      "email" : data.email,
      "password" : data.password
    }
  }

  handleCorrectRegistration(message: any): void{
    this.cardDetails.isLoading = false;
    alert('registration successful! Now you will be moved to login');
    this.router.navigate(['login']);
  }

  handleRegistrationError(err: any): void{
    this.cardDetails.serverAlertMessage = JSON.stringify(err.error);
    this.cardDetails.isLoading = false;
  }

  
  dispatchChangeEvent(eventDetails: string){
    this.changeForm.emit(eventDetails);
  }
}
