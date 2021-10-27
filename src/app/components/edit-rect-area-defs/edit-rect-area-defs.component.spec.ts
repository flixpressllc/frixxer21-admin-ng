import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRectAreaDefsComponent } from './edit-rect-area-defs.component';

describe('EditRectAreaDefsComponent', () => {
  let component: EditRectAreaDefsComponent;
  let fixture: ComponentFixture<EditRectAreaDefsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRectAreaDefsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRectAreaDefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
