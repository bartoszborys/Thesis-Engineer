import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormElement } from '../../../../../lib/dynamicForm/DynamicFormElement';

@Component({
  selector: 'app-dynamic-form-part',
  templateUrl: './dynamic-form-part.component.html',
  styleUrls: ['./dynamic-form-part.component.css']
})
export class DynamicFormPartComponent implements OnInit {
  @Input() form : FormGroup;
  @Input() element : DynamicFormElement<any>;
  
  constructor() { }
  
  ngOnInit() {
  }

}
