import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBlockDefEntityComponent } from './edit-block-def-entity.component';

describe('EditBlockDefEntityComponent', () => {
  let component: EditBlockDefEntityComponent;
  let fixture: ComponentFixture<EditBlockDefEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBlockDefEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBlockDefEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
