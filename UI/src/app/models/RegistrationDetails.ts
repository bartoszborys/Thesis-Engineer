import { UserCredentials } from "./UserCredentials";

export interface RegistrationDetails{
    credentials: UserCredentials;
    details: { name: string, lastName: string, workName: string};
}