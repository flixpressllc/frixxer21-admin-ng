import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBlockDefComponent } from './edit-block-def.component';

describe('EditBlockDefComponent', () => {
  let component: EditBlockDefComponent;
  let fixture: ComponentFixture<EditBlockDefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBlockDefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBlockDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
