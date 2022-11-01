import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { DataObservableService, LookupsService } from '../../_services';

@Component({
  selector: 'app-pump-power',
  templateUrl: './pump-power.component.html',
  styleUrls: ['./pump-power.component.scss']
})
export class PumpPowerComponent implements OnInit {
  flowRate!: any;

  unitsSystems = this.lookupsService.unitsSFL.unitsSystem;
  fluidTypes = this.lookupsService.workingFluid.fluidTypes;

  calculationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private lookupsService: LookupsService,
    private dataObservableService: DataObservableService
  ) { }

  get f() { return this.calculationForm['controls']; }

  ngOnInit(): void {
    this.calculationForm = this.formBuilder.group({
      unitSystem: [1, []],
      flowRate: [0, [Validators.required]],
      head: [0, [Validators.required]],
      fluidType: [1, []],
      fluidTemperature: [25, [Validators.required]],

      pumpEfficiency: [0, [Validators.required]],
      motorEfficiency: [0, [Validators.required]]
    })

    this.dataObservableService.flowRateSubject.subscribe((res: any) => {
      this.flowRate = res;
    })

    // Add Custom Validators
    this.f['fluidTemperature'].setValidators([Validators.required, this.validateFluidTemperature.bind(this)])    
  }

  get hydraulicPower(): number {
    if (!this.isTemperatureInRange()) {
      return NaN
    }
    
    let flowRate = this.f['flowRate'].value * (this.f['unitSystem'].value == 1 ? 1 : 0.0631);
    let head = this.f['head'].value * (this.f['unitSystem'].value == 1 ? 1 : 0.3048);
    let unitFactor = this.f['unitSystem'].value == 1 ? 1 : 1.34102;
    let temperature = this.f['unitSystem'].value == 1 ? this.f['fluidTemperature'].value : ((this.f['fluidTemperature'].value - 32) / 1.8);
    return unitFactor * flowRate * head * this.rho(temperature, this.f['fluidType'].value) * 9.81 / 1000000;
  }

  get shaftPower(): number {
    return this.hydraulicPower / (this.f['pumpEfficiency'].value / 100.0);
  }

  get electricPower(): number {
    return this.shaftPower / (this.f['motorEfficiency'].value / 100.0);
  }

  isTemperatureInRange() {
    let temperature : any = this.fluidTypes.find(x => x.value == this.f['fluidType'].value)
    let min = this.f['unitSystem'].value == 1 ? temperature['min'] : (temperature['min'] * 1.8) + 32;
    let max = this.f['unitSystem'].value == 1 ? temperature['max'] : (temperature['max'] * 1.8) + 32;
    return this.f['fluidTemperature'].value >= min && this.f['fluidTemperature'].value <= max;
  }

  rho(_temperature: any, _fluidType: any): any {
    let temperature : any = this.fluidTypes.find(x => x.value === this.f['fluidType'].value)
    let { a, b, c, d, e, f, g } = temperature['rho'];
    let pow = Math.pow;
    
    return a * pow(_temperature, 6) +
      b * pow(_temperature, 5) +
      c * pow(_temperature, 4) +
      d * pow(_temperature, 3) +
      e * pow(_temperature, 2) +
      f * pow(_temperature, 1) +
      g
  }

  //Change Events
  unitSystemChanged(value: number) {
    
    let temperature;

    if (value === 1) {
      temperature = (this.f['fluidTemperature'].value - 32) / 1.8
      // this.f['fluidTemperatureUnit'].setValue('C');
    } else {
      temperature = (this.f['fluidTemperature'].value * 1.8) + 32
      // this.f['fluidTemperatureUnit'].setValue('F');
    }
    
    temperature = Math.round(temperature * 100) / 100;

    this.f['fluidTemperature'].setValue(temperature);
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

}
