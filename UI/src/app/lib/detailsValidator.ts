import { FormGroup, ValidationErrors, AbstractControl } from "@angular/forms";

export const detailsValidator = (control: FormGroup): ValidationErrors | null => {
    const email = control.get('email');
    const name = control.get('name');
    const lastName = control.get('lastName');
    const password = control.get('password');
    const passwordRepeat = control.get('password-approve');

    const getFirstThreeLetters = (control : AbstractControl) : string => control.value.slice(0, 3);
    const getEmailNamePart = (emailControl : AbstractControl) : string => emailControl.value.slice(0,3);
    const getEmailLastNamePart = (emailControl : AbstractControl) : string => emailControl.value.slice(3,6);

    const emailValidationRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const validEmailDomains = {
        "polsl.pl" : true,
        "student.polsl.pl" : true
    }

    const invalidFormData = {
        'email': !(emailValidationRegex.test(email.value) && validEmailDomains[ email.value.split('@')[1] ]),
        'password-approve': password.value !== passwordRepeat.value,
        'name': getFirstThreeLetters(name).toLowerCase() !== getEmailNamePart(email).toLowerCase(),
        'lastName': getFirstThreeLetters(lastName).toLowerCase() !== getEmailLastNamePart(email).toLowerCase()
    };

    return Object.values(invalidFormData).every( validationPart => !validationPart) ? null : invalidFormData;
}

function getCorrectNameValidator(domain:string){

}

function getCorrectLastNameValidator(domain:string){
    switch(domain){
        case "polsl.pl":
            return null;
            
        case "student.polsl.pl":
            return null;
    }
}

