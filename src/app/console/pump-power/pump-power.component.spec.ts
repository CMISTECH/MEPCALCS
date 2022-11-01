import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpPowerComponent } from './pump-power.component';

describe('PumpPowerComponent', () => {
  let component: PumpPowerComponent;
  let fixture: ComponentFixture<PumpPowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PumpPowerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PumpPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
