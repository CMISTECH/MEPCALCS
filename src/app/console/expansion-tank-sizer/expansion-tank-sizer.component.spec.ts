import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionTankSizerComponent } from './expansion-tank-sizer.component';

describe('ExpansionTankSizerComponent', () => {
  let component: ExpansionTankSizerComponent;
  let fixture: ComponentFixture<ExpansionTankSizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpansionTankSizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpansionTankSizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
