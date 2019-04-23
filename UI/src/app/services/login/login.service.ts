import { Injectable } from '@angular/core';
import { TextInput } from '../../lib/dynamicForm/TextInput';
import { LoginRequestDetails } from '../../models/LoginRequestDetails';
import { UserCredentials } from '../../models/UserCredentials';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DynamicFormCardDetails } from '../../models/DynamicFormCardDetails';
import { DynamicFormElement } from '../../lib/dynamicForm/DynamicFormElement';
import { environment } from '../../../environments/environment.prod';
import { PreAppRoutesDefinition } from 'src/app/lib/PreAppRoutesDefinition';

@Injectable({
  providedIn: 'root'
})
export class LoginService{
  path : string = "/api/user/login";

  constructor(private http : HttpClient){}

  getToken(credentials : UserCredentials) : Observable<LoginRequestDetails> {
    return this.http.post<LoginRequestDetails>(environment.appUrl + this.path, credentials);
  }

  getCardDetails() : DynamicFormCardDetails{
    return {
      loginFormElements : this.getForm(),
      mainMessage : "Logowanie",
      information : "Proszę, wprowadź swój login i hasło",
      buttonValue : "Zaloguj",
      links : [
        {
          route : PreAppRoutesDefinition.Registration.toString(),
          value : "Zarejestruj się"
        },
        {
          route : PreAppRoutesDefinition.PasswordRecovery.toString(),
          value : "Zapomniałeś hasła?"
        }
      ],
      isLoading : false,
      resetButton : false,
      options : {}
    }
  }

  getForm() : Array<DynamicFormElement<any>>{
    return [
      new TextInput({
        controlType : 'text',
        key: 'email',
        type : 'text',
        label: 'Adres email',
        required: true
      }),
      new TextInput({
        controlType : 'text',
        type : 'password',
        key: 'password',
        label: 'Hasło',
        required: true
      })
    ]
  }

}
