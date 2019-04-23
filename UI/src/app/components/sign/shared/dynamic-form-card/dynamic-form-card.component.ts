
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, Form, ValidationErrors } from '@angular/forms';
import { DynamicFormCardDetails } from '../../../../models/DynamicFormCardDetails';

@Component({
  selector: 'app-dynamic-form-card',
  templateUrl: './dynamic-form-card.component.html',
  styleUrls: ['./dynamic-form-card.component.css']
})
export class DynamicFormCardComponent implements OnInit, OnChanges {
  @Input() cardDetails : DynamicFormCardDetails;
  @Output() submittedFormData : EventEmitter<{}> = new EventEmitter<{}>();
  @Output() changeForm : EventEmitter<string> = new EventEmitter<string>();
  form : FormGroup;

  constructor() { }

  ngOnChanges(){
    if(this.cardDetails){
      this.generateFormGroup();
    }
  }

  ngOnInit() {
  }

  generateFormGroup() {
    let group: any = {};
    this.cardDetails.loginFormElements.forEach(formElement => {
      const realValue = formElement.value || '';
      const correctFormControl = formElement.required ? new FormControl(realValue, Validators.required) : new FormControl(realValue);
      group[formElement.key] = correctFormControl  
    });

    const options = (this.cardDetails.options) ? this.cardDetails.options : null;
    this.form = new FormGroup(group, options);
  }

  propagateClick(clickEncryptor: string){
    this.changeForm.emit(clickEncryptor);
  }

  submitForm(){
    this.submittedFormData.emit( this.form.value );
  }

  closeAlertMessage(): void{
    this.cardDetails.serverAlertMessage=''
  }
}
