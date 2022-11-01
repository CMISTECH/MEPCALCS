import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';

import { DataObservableService, FormFactoryService, LookupsService } from '../../../_services';

@Component({
  selector: 'app-pipe-section',
  templateUrl: './pipe-section.component.html',
  styleUrls: ['./pipe-section.component.scss']  
})
export class PipeSectionComponent implements OnInit {
  @Input() isSubmitted!: boolean;
  @Input() pipeSectionForm: FormGroup = new FormGroup({});
  
  unitSystem!: number;
  flowRate!: any;
  length!: any;

  pipeGrades = this.lookupsService.pipeSize.pipeGrades[0];
  pipeSizes = this.lookupsService.pipeSizes['pg1.2'];

  constructor(
    private formFactoryService: FormFactoryService,
    private lookupsService: LookupsService,
    private dataObservableService: DataObservableService
  ) {
    
  }
  
  get f() { return this.pipeSectionForm['controls']; }

  get fittings(): FormArray {
    return <FormArray>this.f['fittings'];
  }

  get valves(): FormArray {
    return <FormArray>this.f['valves'];
  }

  get specialComponents(): FormArray {
    return <FormArray>this.f['specialComponents'];
  }

  ngOnInit(): void {
    this.dataObservableService.unitSystemSubject.subscribe((res: any) => {
      this.unitSystem = res;
    })
    this.dataObservableService.flowRateSubject.subscribe((res: any) => {
      this.flowRate = res;
    })
    this.dataObservableService.lengthSubject.subscribe((res: any) => {
      this.length = res;
    })
    
    this.dataObservableService.pipeStandardSubject.subscribe((res: any) => {
      this.pipeGrades = this.lookupsService.pipeSize.pipeGrades[res - 1] 
      
      this.f['pipeGrade'].setValue(this.pipeGrades.find((g: any) => g.default === true)?.value)
      this.pipeGradeChanged(this.pipeGrades.find((g: any) => g.default === true)?.value!)
    })

    // Add Custom Validators
    this.f['flowRate'].setValidators([Validators.required, this.validateFlowRate.bind(this)])
    this.f['length'].setValidators([Validators.required, this.validateLength.bind(this)])
    this.f['thickness'].setValidators([Validators.required, this.validateThickness.bind(this)])
    this.f['internalDiameter'].setValidators([Validators.required, this.validateInternalDiameter.bind(this)])    
  }

  public addFitting() {
    this.fittings.push(this.formFactoryService.initFitting());
  }
  
  public removeFitting(i: number) {
    this.fittings.removeAt(i);
  }

  public addValve() {
    this.valves.push(this.formFactoryService.initValve());
  }
  
  public removeValve(i: number) {
    this.valves.removeAt(i);
  }

  public addSpecialComponent() {
    this.specialComponents.push(this.formFactoryService.initSpecialComponent());
  }
  
  public removeSpecialComponent(i: number) {
    this.specialComponents.removeAt(i);
  }

  //Change Events
  flipStandardPipeSize() {
    if (this.f['standard'].value === 1) {
      this.f['pipeGrade'].enable()
      this.f['pipeSize'].enable()
      if (this.pipeGrades[this.f['pipeGrade'].value - 1].key === 'pg2.6') {
        this.f['thickness'].enable()
      }

      this.f['sizeDesignation'].disable()
      this.f['internalDiameter'].disable()
    } else if (this.f['standard'].value === 2) {
      this.f['pipeGrade'].disable()
      this.f['pipeSize'].disable()
      this.f['thickness'].disable()

      this.f['sizeDesignation'].enable()
      this.f['internalDiameter'].enable()
    }
  }

  pipeGradeChanged(value: number) {
    this.pipeSizes = this.lookupsService.pipeSizes[this.pipeGrades[value - 1].key];
    this.f['pipeSize'].setValue(this.pipeSizes[0])  
    
    if (this.pipeGrades[this.f['pipeGrade'].value - 1].key === 'pg2.6' && this.f['standard'].value === 1) {
      this.f['thickness'].enable()
    }  else {
      this.f['thickness'].disable()
    }

    this.f['pipeGradeOutput'].setValue(this.pipeGrades[value - 1].key.substring(2, this.pipeGrades[value - 1].key.length))
    this.f['pipeGradeOutputText'].setValue(this.pipeGrades[value - 1].label)
  }

  // Custom Validators
  validateFlowRate(control: AbstractControl) {
    let uf = this.flowRate.uf;
    let value = control.value * uf;
    if (value < 0 || value > 3000) {
      return { flowRateRange: true };
    }
    return null;
  }

  validateLength(control: AbstractControl) {
    let ul = this.length.ul;
    let value = control.value * ul;
    if (value < 0 || value > 9999) {
      return { lengthRange: true };
    }
    return null;
  }

  validateThickness(control: AbstractControl) {
    let value = this.unitSystem === 1 ? control.value : control.value * 25.4;
    if (value < 0.5 || value > 100) {
      return { thicknessRange: true };
    }
    return null;
  }

  validateInternalDiameter(control: AbstractControl) {
    let value = this.unitSystem === 1 ? control.value : control.value * 25.4;
    if (value < 5 || value > 3000) {
      return { internalDiameterRange: true };
    }
    return null;
  }

}
