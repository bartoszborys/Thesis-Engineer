import { FormGroup, ValidationErrors } from "@angular/forms";

export const registrationFormValidator = (control: FormGroup): ValidationErrors | null => {
    const email = control.get('email');
    const password = control.get('password');
    const passwordRepeat = control.get('password-approve');

    const emailValidationRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const validEmailDomains = {
        "polsl.pl" : true,
        "student.polsl.pl" : true
    }

    const givenDomain = email.value.split('@')[1];

    const invalidFormData = {
        'email': !( emailValidationRegex.test(email.value) && validEmailDomains[givenDomain] ),
        'password-approve': password.value !== passwordRepeat.value
    };

    return Object.values(invalidFormData).every( validationPart => !validationPart) ? null : invalidFormData;
}

