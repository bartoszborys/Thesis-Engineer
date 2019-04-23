import { Injectable } from '@angular/core';
import { TextInput } from '../../lib/dynamicForm/TextInput';
import { DynamicFormElement } from '../../lib/dynamicForm/DynamicFormElement';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { registrationFormValidator } from 'src/app/lib/registrationFormValidator';
import { UserCredentials } from 'src/app/models/UserCredentials';
import { PreAppRoutesDefinition } from 'src/app/lib/PreAppRoutesDefinition';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService{
  path : string = "/api/user/registration";

  constructor(private http : HttpClient){}

  register(registrationData: UserCredentials) : Observable<object> {
    return this.http.post<object>(environment.appUrl + this.path, registrationData);
  }

  getCardDetails(){
    return {
      loginFormElements : this.getForm(),
      mainMessage : "Rejestracja",
      information : "Proszę, wypełnij fromularz",
      buttonValue : "Rejestruj",
      links : [
        {
          route : PreAppRoutesDefinition.Login.toString(),
          value : "Zarejestrowany?"
        },
        {
          route : PreAppRoutesDefinition.PasswordRecovery.toString(),
          value : "Zapomniałes hasła?"
        }
      ],
      resetButton : true,
      options: {
        validators: registrationFormValidator
      },      
    }
  }
  
  getForm() : Array< DynamicFormElement<any> >{
    return [
      new TextInput({
        controlType : 'text',
        type : 'email',
        key: 'email',
        label: 'Adres email',
        required: true,
        invalidMessage: 'Niepoprawny adres'
      }), 
      new TextInput({
        controlType : 'text',
        type : 'password',
        key: 'password',
        label: 'Hasło',
        required: true,
        invalidMessage: 'Empty'
      }), 
      new TextInput({
        controlType : 'text',
        type : 'password',
        key: 'password-approve',
        label: 'Powtórz hasło',
        required: true,
        invalidMessage: 'Hasła nie są te same!'
      })
    ]
  }
}
