import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockDefsComponent } from './block-defs.component';

describe('BlockDefsComponent', () => {
  let component: BlockDefsComponent;
  let fixture: ComponentFixture<BlockDefsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockDefsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockDefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
