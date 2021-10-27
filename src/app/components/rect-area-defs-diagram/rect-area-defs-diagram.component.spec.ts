import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RectAreaDefsDiagramComponent } from './rect-area-defs-diagram.component';

describe('RectAreaDefsDiagramComponent', () => {
  let component: RectAreaDefsDiagramComponent;
  let fixture: ComponentFixture<RectAreaDefsDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RectAreaDefsDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectAreaDefsDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
