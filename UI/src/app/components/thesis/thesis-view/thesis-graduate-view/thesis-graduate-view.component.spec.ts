import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisGraduateViewComponent } from './thesis-graduate-view.component';

describe('ThesisGraduateViewComponent', () => {
  let component: ThesisGraduateViewComponent;
  let fixture: ComponentFixture<ThesisGraduateViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThesisGraduateViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThesisGraduateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
