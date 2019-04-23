import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGlobalMessageFormComponent } from './add-global-message-form.component';

describe('AddGlobalMessageFormComponent', () => {
  let component: AddGlobalMessageFormComponent;
  let fixture: ComponentFixture<AddGlobalMessageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGlobalMessageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGlobalMessageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
