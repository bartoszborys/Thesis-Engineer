import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { ChangePasswordData } from 'src/app/models/backend-integration-models/ChangePasswordData';

@Component({
  selector: 'app-account-managment-change-password',
  templateUrl: './account-managment-change-password.component.html',
  styleUrls: ['./account-managment-change-password.component.css']
})
export class AccountManagmentChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    newPasswordRepeat: new FormControl(''),
  }, (currentForm: FormGroup): ValidationErrors | null => {
    const newPassword = currentForm.get('newPassword');
    const repeatPassword = currentForm.get('newPasswordRepeat');
    return (newPassword.value !== repeatPassword.value) ? { 'passwordsNotSame': true } : null;
  });
  
  constructor(private service: UserService) {}

  ngOnInit() {
  }

  public onSubmit(): void{
   const data: any = {
     OldPassword: this.changePasswordForm.get('oldPassword').value,
     NewPassword: this.changePasswordForm.get('newPassword').value
   };
   this.service.changePassword(data).subscribe( 
     (response) => console.log(response),
     (error) => console.error(error.error)
   );
  }
}
