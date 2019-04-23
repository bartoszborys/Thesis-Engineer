import { DynamicFormData } from "./DynamicFormData";

export class DynamicFormElement<T>{
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    invalidMessage: string;
   
    constructor(options: DynamicFormData<T> = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.invalidMessage = options.invalidMessage;
    }
}