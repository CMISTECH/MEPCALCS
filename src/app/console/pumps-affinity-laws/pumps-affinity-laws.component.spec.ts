import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpsAffinityLawsComponent } from './pumps-affinity-laws.component';

describe('PumpsAffinityLawsComponent', () => {
  let component: PumpsAffinityLawsComponent;
  let fixture: ComponentFixture<PumpsAffinityLawsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PumpsAffinityLawsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PumpsAffinityLawsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
