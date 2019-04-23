import { faKey, faSlidersH, faUniversity } from '@fortawesome/free-solid-svg-icons';
import { AccountManagmentCardButton } from 'src/app/lib/AccountManagmentCardButton';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { State } from 'src/app/lib/AccountManagmentStates';
import { UserService } from 'src/app/services/user/user.service';
import { SubscriptionLike } from 'rxjs';
import { UserDetails } from 'src/app/models/backend-integration-models/UserDetails';

@Component({
  selector: 'app-account-managment-card',
  templateUrl: './account-managment-card.component.html',
  styleUrls: ['./account-managment-card.component.css']
})
export class AccountManagmentCardComponent implements OnInit {
  public promoter: boolean = sessionStorage.getItem('role') == "PRO";
  @Output() windowState: EventEmitter<State> = new EventEmitter<State>();
  @Input() newProfile: string | ArrayBuffer;
  public currentImage: string = '';
  public resetState: string = "Please select state";
  public buttonsState: string;
  public actionButtons: Array<AccountManagmentCardButton> = [
    {
      hoverText: "Zmiana hasła",
      icon: faKey,
      toState: State.PASSWORD
    },
    {
      hoverText: "Edytuj swój profil",
      icon: faSlidersH,
      toState: State.DETAILS
    }
  ];
  public userDetails: UserDetails;
  private subscriptions: Array<SubscriptionLike> = new Array<SubscriptionLike>();

  constructor(private service: UserService) { }

  ngOnInit() {
    this.subscriptions.push( this.reciveUserDetails() );
    this.subscriptions.push( this.subscribeUserDetailsChange() );
    this.resetButtonDescription();
  }

  public resetButtonDescription(){
    this.buttonsState = this.resetState;
  }

  private subscribeUserDetailsChange(): SubscriptionLike{
    return this.service.detailsUpdated.subscribe( updated =>{
      this.subscriptions.push(this.reciveUserDetails());
    })
  }

  private reciveUserDetails(): SubscriptionLike{
    return this.service.getUserDetails().subscribe( (details: UserDetails) => {
      this.userDetails = details;
    });
  }

  public changeState(to: State, stateDescription: string){
    this.resetState = stateDescription;
    this.windowState.emit(to);
  }

  public changeButtonDescription(to: string){
    this.buttonsState = to;
  }

  ngOnDestroy(){
    this.subscriptions.forEach( s=> s.unsubscribe() );
  }
}
