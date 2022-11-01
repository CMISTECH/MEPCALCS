import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FittingComponent } from './fitting.component';

describe('FittingComponent', () => {
  let component: FittingComponent;
  let fixture: ComponentFixture<FittingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FittingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FittingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
