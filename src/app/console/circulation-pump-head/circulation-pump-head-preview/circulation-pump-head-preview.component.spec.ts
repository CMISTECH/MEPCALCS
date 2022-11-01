import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirculationPumpHeadPreviewComponent } from './circulation-pump-head-preview.component';

describe('CirculationPumpHeadPreviewComponent', () => {
  let component: CirculationPumpHeadPreviewComponent;
  let fixture: ComponentFixture<CirculationPumpHeadPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirculationPumpHeadPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CirculationPumpHeadPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
