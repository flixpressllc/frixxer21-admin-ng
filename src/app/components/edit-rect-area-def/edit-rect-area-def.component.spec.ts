import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRectAreaDefComponent } from './edit-rect-area-def.component';

describe('EditRectAreaDefComponent', () => {
  let component: EditRectAreaDefComponent;
  let fixture: ComponentFixture<EditRectAreaDefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRectAreaDefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRectAreaDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
