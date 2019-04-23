import { DynamicFormElement } from "./DynamicFormElement";

export class TextInput extends DynamicFormElement<string>{
    type: string;
    
    constructor(setupMetadata : {}){
        super(setupMetadata);
        this.controlType = 'text'
        this.type = setupMetadata["type"];
    }
}