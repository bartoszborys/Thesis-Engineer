import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisPdfViewerComponent } from './thesis-pdf-viewer.component';

describe('ThesisPdfViewerComponent', () => {
  let component: ThesisPdfViewerComponent;
  let fixture: ComponentFixture<ThesisPdfViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThesisPdfViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThesisPdfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
