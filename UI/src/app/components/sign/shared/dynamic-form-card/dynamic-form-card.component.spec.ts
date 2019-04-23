import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormCardComponent } from './dynamic-form-card.component';

describe('MainFormComponent', () => {
  let component: DynamicFormCardComponent;
  let fixture: ComponentFixture<DynamicFormCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
