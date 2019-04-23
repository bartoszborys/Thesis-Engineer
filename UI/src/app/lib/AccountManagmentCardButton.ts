import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { State } from "./AccountManagmentStates";

export interface AccountManagmentCardButton{
    hoverText: string;
    icon: IconDefinition;
    toState: State;
}