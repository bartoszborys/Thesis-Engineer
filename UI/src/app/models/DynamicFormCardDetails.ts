import { DynamicFormElement } from "../lib/dynamicForm/DynamicFormElement";
import { RouterLink } from "./RouterLink";
import { AbstractControlOptions } from "@angular/forms";

export interface DynamicFormCardDetails{
    mainMessage : string;
    information : string;
    buttonValue : string;
    loginFormElements : Array<DynamicFormElement<any>>;
    links? : Array<RouterLink>;
    serverAlertMessage? : string;
    isLoading? : boolean;
    options? : AbstractControlOptions;
    resetButton : boolean;
}