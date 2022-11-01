import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionTankSizerPreviewComponent } from './expansion-tank-sizer-preview.component';

describe('ExpansionTankSizerPreviewComponent', () => {
  let component: ExpansionTankSizerPreviewComponent;
  let fixture: ComponentFixture<ExpansionTankSizerPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpansionTankSizerPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpansionTankSizerPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
