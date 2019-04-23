import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManagmentThesisComponent } from './account-managment-thesis.component';

describe('AccountManagmentThesisComponent', () => {
  let component: AccountManagmentThesisComponent;
  let fixture: ComponentFixture<AccountManagmentThesisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountManagmentThesisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManagmentThesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
