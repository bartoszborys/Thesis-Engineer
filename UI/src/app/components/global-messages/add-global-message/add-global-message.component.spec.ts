import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGlobalMessageComponent } from './add-global-message.component';

describe('AddGlobalMessageComponent', () => {
  let component: AddGlobalMessageComponent;
  let fixture: ComponentFixture<AddGlobalMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGlobalMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGlobalMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
