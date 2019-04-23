import { DynamicFormElement } from "./DynamicFormElement";

export class TextInput extends DynamicFormElement<string>{
    options: {key: string, value: string}[] = [];
    
    constructor(setupMetadata : any){
        super(setupMetadata);
        this.options = setupMetadata.options;
        this.controlType = 'dropdown';
    }

}