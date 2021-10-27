import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBlockDefComponent } from './create-block-def.component';

describe('CreateBlockDefComponent', () => {
  let component: CreateBlockDefComponent;
  let fixture: ComponentFixture<CreateBlockDefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBlockDefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBlockDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
