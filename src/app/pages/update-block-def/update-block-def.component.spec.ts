import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBlockDefComponent } from './update-block-def.component';

describe('UpdateBlockDefComponent', () => {
  let component: UpdateBlockDefComponent;
  let fixture: ComponentFixture<UpdateBlockDefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBlockDefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBlockDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
