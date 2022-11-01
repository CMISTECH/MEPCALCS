import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeSectionComponent } from './pipe-section.component';

describe('PipeSectionComponent', () => {
  let component: PipeSectionComponent;
  let fixture: ComponentFixture<PipeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipeSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
