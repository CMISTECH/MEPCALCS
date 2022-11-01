import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirculationPumpHeadComponent } from './circulation-pump-head.component';

describe('CirculationPumpHeadComponent', () => {
  let component: CirculationPumpHeadComponent;
  let fixture: ComponentFixture<CirculationPumpHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirculationPumpHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirculationPumpHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
