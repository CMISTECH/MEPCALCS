import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeSizerPreviewComponent } from './pipe-sizer-preview.component';

describe('PipeSizerPreviewComponent', () => {
  let component: PipeSizerPreviewComponent;
  let fixture: ComponentFixture<PipeSizerPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipeSizerPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipeSizerPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
