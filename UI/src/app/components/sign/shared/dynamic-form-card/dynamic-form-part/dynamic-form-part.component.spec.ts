import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormPartComponent } from './dynamic-form-part.component';

describe('DynamicFormPartComponent', () => {
  let component: DynamicFormPartComponent;
  let fixture: ComponentFixture<DynamicFormPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
