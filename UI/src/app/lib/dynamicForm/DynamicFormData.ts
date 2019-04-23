import { Validator } from "@angular/forms";

export interface DynamicFormData<T>{
    value?: T,
    key?: string,
    label?: string,
    required?: boolean,
    order?: number,
    controlType?: string,
    validators? : Array<Validator>,
    invalidMessage? : string
}