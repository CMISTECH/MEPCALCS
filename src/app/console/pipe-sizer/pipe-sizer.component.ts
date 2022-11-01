import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { APIService, DataObservableService, FormFactoryService, LookupsService } from '../../_services';

@Component({
  selector: 'app-pipe-sizer',
  templateUrl: './pipe-sizer.component.html',
  styleUrls: ['./pipe-sizer.component.scss']
})
export class PipeSizerComponent implements OnInit {
  isLoading = true;
  isSubmitting = false;
  isSubmitted = false;
  showResult = false;
  responseData: any = [];

  flowRate!: any;

  unitsSystems = this.lookupsService.unitsSFL.unitsSystem;
  flowRates = this.lookupsService.unitsSFL.flowRates[0];
  fluidTypes = this.lookupsService.workingFluid.fluidTypes;

  pipeMaterials = this.lookupsService.pipeType.pipeMaterials;
  standardSystems = this.lookupsService.pipeType.standardSystems;
  sizeStandards = this.lookupsService.pipeType.sizeStandards;
  pipeGrades = this.lookupsService.pipeSize.pipeGrades[0];

  calculationForm!: FormGroup;

  constructor(
    private apiService: APIService,
    private formBuilder: FormBuilder,
    private formFactoryService: FormFactoryService,
    private lookupsService: LookupsService,
    private dataObservableService: DataObservableService
  ) { 
    this.apiService.getCPData().subscribe((res: any) => {
      this.lookupsService.pipeSizes = res['pipeSizes'];
      this.lookupsService.fittingTypes = res['fittingTypes'];
      this.lookupsService.valveSizes = res['valveSizes'];

      this.isLoading = false;
    })
  }

  get f() { return this.calculationForm['controls']; }

  ngOnInit(): void {
    this.calculationForm = this.formBuilder.group({
      unitSystem: [1, []],
      flowRateUnit: [1, []],
      
      fluidType: [1, []],
      fluidTemperature: [25, [Validators.required]],
      // fluidTemperatureUnit: ['C', []],

      pipeMaterial: [1, []],
      standardSystem: [1, []],
      sizeStandard: [this.sizeStandards[0][0], []],
      pipeGrade: ['', []],

      flowRate: ['', [Validators.required]],

      criteria: [1, []],
      maxAllowedPressureDrop: ['', [Validators.required]],
      maxAllowedVelocity: [{ value: '', disabled: true }, [Validators.required]],
    })

    this.dataObservableService.pipeStandardSubject.subscribe((res: any) => {
      this.pipeGrades = this.lookupsService.pipeSize.pipeGrades[res - 1] 
      
      this.f['pipeGrade'].setValue(this.pipeGrades.find((g: any) => g.default === true)?.value)
    })

    this.dataObservableService.flowRateSubject.subscribe((res: any) => {
      this.flowRate = res;
    })

    // Add Custom Validators
    this.f['fluidTemperature'].setValidators([Validators.required, this.validateFluidTemperature.bind(this)])    
    this.f['flowRate'].setValidators([Validators.required, this.validateFlowRate.bind(this)])
    this.f['maxAllowedPressureDrop'].setValidators([Validators.required, this.validateMaxAllowedPressureDrop.bind(this)])
    this.f['maxAllowedVelocity'].setValidators([Validators.required, this.validateMaxAllowedVelocity.bind(this)])
  }

  onSubmit() {
    this.isSubmitted = true;

    // stop here if form is invalid
    if (this.calculationForm.invalid) {
      this.scrollToError();
      return;
    }
    
    this.isSubmitting = true;

    const body = {
      'unitSystemId': this.f['unitSystem'].value,
      'flowRateId': this.f['flowRateUnit'].value,

      'fluidTypeId': this.f['fluidType'].value, 
      'workingFluid': {
        'fluidTemperature': this.f['fluidTemperature'].value,
      },

      'pipeMaterialId': this.f['pipeMaterial'].value,
      'standardSystemId': this.f['standardSystem'].value,
      'sizeStandardId': this.f['sizeStandard']['value'].value,
      'pipeGradeClassId': this.f['pipeGrade'].value,

      'flowRate': this.f['flowRate'].value,
      'velocityCriteria': this.f['criteria'].value == 2 ? true : false,
      'maxAllowedPressureDrop': this.f['maxAllowedPressureDrop'].value,
      'maxAllowedVelocity': this.f['maxAllowedVelocity'].value
    }

    this.apiService.calculatePipeSizer(body).subscribe((res: any) => {
      this.responseData = res['data'];
      this.responseData['flowRate'] = this.getValue(this.responseData['flowRate']);
      this.responseData['pipeSize'] = this.getValue(this.responseData['pipeSize']);
      this.responseData['iDiameter'] = this.getValue(this.responseData['iDiameter']);
      this.responseData['velocity'] = this.getValue(this.responseData['velocity']);
      this.responseData['pressureDrop'] = this.getValue(this.responseData['pressureDrop']);

      if (this.f['flowRateUnit'].value == 1) {
        this.responseData['flowRateUnit'] = 'l/s'
      } else if (this.f['flowRateUnit'].value == 2) { 
        this.responseData['flowRateUnit'] = 'm³/hr'
      } else if (this.f['flowRateUnit'].value == 3) { 
        this.responseData['flowRateUnit'] = 'CFM (ft³/m)'
      } else if (this.f['flowRateUnit'].value == 4) { 
        this.responseData['flowRateUnit'] = 'GPM (US)'
      } else if (this.f['flowRateUnit'].value == 5) { 
        this.responseData['flowRateUnit'] = 'GPM (UK)'
      }

      if (this.f['unitSystem'].value == 1) {
        this.responseData['iDiameterUnit'] = 'mm'
        this.responseData['velocityUnit'] = 'm/s'
        this.responseData['pressureDropUnit'] = 'Pa/m'
      } else { 
        this.responseData['iDiameterUnit'] = 'inch'
        this.responseData['velocityUnit'] = 'fps'
        this.responseData['pressureDropUnit'] = 'ft/100ft'
      }

      this.showResult = true;
      this.isSubmitting = false;
      this.isSubmitted = false;
    })
  }

  public getValue(value: any): any {
    if (value === undefined || value == null || value === '') {
      return '-----';
    }
    if (typeof value === 'number') {
      return value.toFixed(2);
    }
    return value;
  }

  // Scroll to Errors
  scrollTo(el: Element): void {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  scrollToError(): void {
    const firstElementWithError = document.querySelector('.ng-invalid[formControlName]');
    this.scrollTo(<Element>firstElementWithError);
  }

  //Change Events
  unitSystemChanged(value: number) {
    this.dataObservableService.unitSystemSubject.next(value);

    this.flowRates = this.lookupsService.unitsSFL.flowRates[value - 1];
    this.f['flowRate'].setValue(1);
    this.flowRateChanged(1);

    if (value === 1) {
      this.f['fluidTemperature'].setValue(25);
      // this.f['fluidTemperatureUnit'].setValue('C');
    } else {
      this.f['fluidTemperature'].setValue(75);
      // this.f['fluidTemperatureUnit'].setValue('F');
    }
  }

  flowRateChanged(value: number) {
    this.dataObservableService.flowRateSubject.next(this.flowRates[value - 1])    
  }

  pipeMaterialChanged(value: number) {
    this.f['sizeStandard'].setValue(this.sizeStandards[value - 1][this.f['standardSystem'].value - 1]);
    this.dataObservableService.pipeStandardSubject.next(this.f['sizeStandard'].value['value']);

    this.dataObservableService.pipeMaterialSubject.next(value);
  }

  standardSystemChanged(value: number) {
    this.f['sizeStandard'].setValue(this.sizeStandards[this.f['pipeMaterial'].value - 1][value - 1]);
    
    this.dataObservableService.pipeStandardSubject.next(this.f['sizeStandard'].value['value']);
  }

  changeCriteria() {
    if (this.f['criteria'].value === 1) {
      this.f['maxAllowedPressureDrop'].enable()
      this.f['maxAllowedVelocity'].disable()
    } else if (this.f['criteria'].value === 2) {
      this.f['maxAllowedPressureDrop'].disable()
      this.f['maxAllowedVelocity'].enable()
    }
  }

  // Custom Validators
  fluidTemperatureRange() {
    const limitArray = [
      { min: 5, max: 100 }, { min: -20, max: 110 }, { min: -20, max: 110 }, { min: -10, max: 105 },
      { min: -5, max: 105 }, { min: 0, max: 105 }, { min: -20, max: 110 }, { min: -20, max: 105 },
      { min: -10, max: 105 }, { min: -5, max: 105 }, { min: 0, max: 100 }
    ];

    return limitArray[this.f['fluidType'].value - 1]
  }

  validateFluidTemperature(control: AbstractControl) {
    const limits = this.fluidTemperatureRange();
    
    let fluidTemperature = control.value;

    if (this.f['unitSystem'].value == 2) {
      fluidTemperature = (this.f['fluidTemperature'].value - 32) / 1.8;
    }

    if (fluidTemperature < limits.min || fluidTemperature > limits.max) {
      return { temperatureRange: true };
    };

    return null;
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

  validateMaxAllowedPressureDrop(control: AbstractControl) {
    let value = this.f['unitSystem'].value == 1 ? control.value : control.value * 98.06;
    
    if (value < 0.1 || value > 9999) {
      return {maxAllowedPressureDropRange: true}
    }
    return null;
  }

  validateMaxAllowedVelocity(control: AbstractControl) {
    let value = this.f['unitSystem'].value == 1 ? control.value : control.value * 0.3048;
    
    if (value < 0.1 || value > 9999) {
      return {maxAllowedVelocityRange: true}
    }
    return null;
  }

}
