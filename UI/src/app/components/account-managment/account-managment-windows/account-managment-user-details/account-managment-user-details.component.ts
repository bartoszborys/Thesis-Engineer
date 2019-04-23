import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SubscriptionLike } from 'rxjs';
import { UserDetails } from 'src/app/models/backend-integration-models/UserDetails';
import { HttpError } from '@aspnet/signalr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-account-managment-user-details',
  templateUrl: './account-managment-user-details.component.html',
  styleUrls: ['./account-managment-user-details.component.css']
})
export class AccountManagmentUserDetailsComponent implements OnInit, OnDestroy {
  @Output() file: EventEmitter<string | ArrayBuffer> = new EventEmitter<string | ArrayBuffer>();
  public promoter: boolean = sessionStorage.getItem('role') == "PRO";
  public form: FormGroup = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
    studyFieldId: new FormControl(''),
    promoterId: new FormControl(''),
    engineerWork: new FormControl('')
  });
  public promoters: Array<any>;
  public userDetails: UserDetails;
  public studyFields: any;
  public errorMessage: string;
  private subscribtions: Array<SubscriptionLike> = new Array();

  constructor(private service: UserService) { }

  ngOnInit() {
    this.subscribtions.push( this.loadPromoters() )
    this.subscribtions.push( this.loadStudyFields() )
    this.subscribtions.push( this.loadCurrentUserData() )
  }
  
  private loadPromoters(): SubscriptionLike{
    return this.service.getPromoters().subscribe( promoters =>{
      this.promoters = promoters;
    });
  }

  private loadStudyFields(): SubscriptionLike{
    return this.service.getFieldsOfStudy().subscribe( studyFields =>{
      this.studyFields = studyFields;
    });
  }

  private loadCurrentUserData(): SubscriptionLike{
    return this.service.getUserDetails().subscribe( userDetails =>{
      this.userDetails = userDetails;
      this.rewriteData();
    });
  }

  public rewriteData(): void{
    this.form.get('name').setValue(this.userDetails.name);
    this.form.get('lastName').setValue(this.userDetails.lastName);
    this.form.get('promoterId').setValue(this.userDetails.promoterId);
    this.form.get('studyFieldId').setValue(this.userDetails.studyFieldId);
    this.form.get('engineerWork').setValue(this.userDetails.engineerWork);
  }

  public onFileChanged(event: any): void{
    const reader: FileReader = new FileReader();
    reader.onload = ()=>{
      this.file.emit( reader.result );
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  public submit(){
    this.form.disable();
    this.subscribtions.push( this.service.updateUserDetails(this.form.value).subscribe( 
      (result) => {
        this.service.detailsUpdated.emit(true);
        this.form.enable();
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
        this.form.enable();
      }
    ));
  }

  ngOnDestroy(): void {
    this.file.emit( null );
    this.subscribtions.forEach( subscribtion => subscribtion.unsubscribe() );
  }
}
