import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoosterPumpHeadPreviewComponent } from './booster-pump-head-preview.component';

describe('BoosterPumpHeadPreviewComponent', () => {
  let component: BoosterPumpHeadPreviewComponent;
  let fixture: ComponentFixture<BoosterPumpHeadPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoosterPumpHeadPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoosterPumpHeadPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
