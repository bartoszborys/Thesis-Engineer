import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManagmentChangePasswordComponent } from './account-managment-change-password.component';

describe('AccountManagmentChangePasswordComponent', () => {
  let component: AccountManagmentChangePasswordComponent;
  let fixture: ComponentFixture<AccountManagmentChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountManagmentChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManagmentChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
