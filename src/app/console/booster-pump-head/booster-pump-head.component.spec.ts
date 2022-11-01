import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoosterPumpHeadComponent } from './booster-pump-head.component';

describe('BoosterPumpHeadComponent', () => {
  let component: BoosterPumpHeadComponent;
  let fixture: ComponentFixture<BoosterPumpHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoosterPumpHeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoosterPumpHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
