import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeSizerComponent } from './pipe-sizer.component';

describe('PipeSizerComponent', () => {
  let component: PipeSizerComponent;
  let fixture: ComponentFixture<PipeSizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipeSizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipeSizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
