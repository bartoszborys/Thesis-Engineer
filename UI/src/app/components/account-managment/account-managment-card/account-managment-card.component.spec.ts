import { AccountManagmentCardComponent } from './account-managment-card.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('AccountManagmentCardComponent', () => {
  let component: AccountManagmentCardComponent;
  let fixture: ComponentFixture<AccountManagmentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountManagmentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManagmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
