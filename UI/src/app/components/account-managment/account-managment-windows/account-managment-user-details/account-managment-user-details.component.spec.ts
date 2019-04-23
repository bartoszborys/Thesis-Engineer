import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManagmentUserDetailsComponent } from './account-managment-user-details.component';

describe('AccountManagmentUserDetailsComponent', () => {
  let component: AccountManagmentUserDetailsComponent;
  let fixture: ComponentFixture<AccountManagmentUserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountManagmentUserDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManagmentUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
