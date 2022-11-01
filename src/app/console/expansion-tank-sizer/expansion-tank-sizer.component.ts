import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';

import { APIService, FormFactoryService, LookupsService } from '../../_services';

@Component({
  selector: 'app-expansion-tank-sizer',
  templateUrl: './expansion-tank-sizer.component.html',
  styleUrls: ['./expansion-tank-sizer.component.scss']
})
export class ExpansionTankSizerComponent implements OnInit {
  isLoading = true;
  isSubmitting = false;
  isSubmitted = false;
  showResult = false;
  responseData: any = [];

  unitsSystems = this.lookupsService.unitsSFL.unitsSystem;
  fluidTypes = this.lookupsService.workingFluid.fluidTypes;
  
  systemTypes: any = [];
  tankTypes: any = [];
  pipingMaterials: any = [];

  calculationForm!: FormGroup;

  constructor(
    private apiService: APIService,
    private formBuilder: FormBuilder,
    private formFactoryService: FormFactoryService,
    private lookupsService: LookupsService    
  ) { 
    this.apiService.getESTData().subscribe((res: any) => {
      this.lookupsService.systemTypes = res['data'].selectCategories.SYSTEM_TYPE.options;
      this.lookupsService.tankTypes = res['data'].selectCategories.TANK_TYPE.options;
      this.lookupsService.pipingMaterials = res['data'].selectCategories.PIPING_MATERIAL.options;
      
      this.systemTypes = this.lookupsService.systemTypes;
      this.tankTypes = this.lookupsService.tankTypes;
      this.pipingMaterials = this.lookupsService.pipingMaterials;

      this.isLoading = false;
    })
    
  }

  get f() { return this.calculationForm['controls']; }

  get fluidVolumeEquipments(): FormArray {
    return <FormArray>this.f['fluidVolumeEquipments'];
  }

  ngOnInit(): void {
    this.calculationForm = this.formBuilder.group({
      project: ['', []],
      expansionTankRef: ['', []],

      unitSystem: [1, []],
      fluidType: [1, []],
      
      systemType: [2, []],
      tankType: [1, []],
      pipingMaterial: [1, []],

      fluidVolume: [0, [Validators.required]],

      fluidVolumeEquipments: this.formBuilder.array([
        this.formFactoryService.initFluidVolumeEquipment()
      ]),

      solarVolume: [{ value: 0, disabled: true }, [Validators.required]],

      maxAmbientTemperature: [35, [Validators.required]],
      height: [{ value: 0, disabled: true }, [Validators.required]],
      
      maxOperatingTemperature: [80, [Validators.required]],
      minPressureAtHighestPoint: [{ value: '', disabled: true }, [Validators.required]],
      
      fluidTemperatureAtFilling: [20, [Validators.required]],
      settingOfPVC: [{ value: '', disabled: true }, [Validators.required]],      
    })
    
    // Add Custom Validators
    this.f['maxAmbientTemperature'].setValidators([Validators.required, this.validateMaxAmbientTemperature.bind(this)])    
    this.f['maxOperatingTemperature'].setValidators([Validators.required, this.validateMaxOperatingTemperature.bind(this)])    
    this.f['minPressureAtHighestPoint'].setValidators([Validators.required, this.validateMinPressureAtHighestPoint.bind(this)])    
    this.f['fluidTemperatureAtFilling'].setValidators([Validators.required, this.validateFluidTemperatureAtFilling.bind(this), this.validateCompairisionFluidTemperatureAtFilling.bind(this)])    
    this.f['settingOfPVC'].setValidators([Validators.required, this.validateCompairisionSettingOfPVC.bind(this)])    
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
      'info': {},
      'unitSystemId': this.f['unitSystem'].value,
      'fluidTypeId': this.f['fluidType'].value,
      'systemTypeId': this.f['systemType'].value,
      'tankTypeId': this.f['tankType'].value,
      'pipingMaterialId': this.f['pipingMaterial'].value,
      
      'systemVolume': {
        'volumeOfLiquidInPipes': this.f['fluidVolume'].value,
        'equipments': this.f['fluidVolumeEquipments'].value.map((e: any) => {
          return {
            'desc': e['description'],
            'volumeOfLiquidInEquipment': e['fluidVolume']            
          }
        }),
        'volumeOfLiquidInSolar': this.f['solarVolume'].value
      },
      'opParam': {
        'maxAmbientTemp': this.f['maxAmbientTemperature'].value,
        'h': this.f['height'].value,
        'maxOperationTemp': this.f['maxOperatingTemperature'].value,
        'minPressure': this.f['minPressureAtHighestPoint'].value, 
        'fillingTemp': this.f['fluidTemperatureAtFilling'].value,
        'maxPressure': this.f['settingOfPVC'].value
      }
    }

    this.apiService.calculateExpansionTankSizer(body).subscribe((res: any) => {
      this.responseData = res['data'];
      this.responseData['info'].project = this.f['project'].value;
      this.responseData['info'].expansionTankRef = this.f['expansionTankRef'].value;
      
      if (this.responseData['systemVolume'] === undefined || this.responseData['systemVolume'] == null) {
        this.responseData['systemVolume'] = { equipments: [], volumeOfLiquidInPipes: null, volumeOfLiquidInSolar: null }
      }
      if (this.responseData['expansionVolume'] === undefined || this.responseData['expansionVolume'] == null) {
        this.responseData['expansionVolume'] = { expansionVolume: null, maxDen: null, maxTemp: null, minDen: null, minTemp: null }
      }
      if (this.responseData['expChar'] === undefined || this.responseData['expChar'] == null) {
        this.responseData['expChar'] = { expansionVolume: null, initPre: null, minTVol: null, systemType: null, tankType: null }
      }
      if (this.responseData['systemPressure'] === undefined || this.responseData['systemPressure'] == null) {
        this.responseData['systemPressure'] = { maxPre: null, minPre: null }
      }

      this.responseData['unitSystem'] = this.f['unitSystem'].value;
      this.responseData['systemType'] = this.f['systemType'].value;
      this.responseData['tankType'] = this.f['tankType'].value;
        
      this.showResult = true;
      this.isSubmitting = false;
      this.isSubmitted = false;
    })
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

  public addEquipment() {
    this.fluidVolumeEquipments.push(this.formFactoryService.initFluidVolumeEquipment());
  }

  public removeEquipment(i: number) {
    this.fluidVolumeEquipments.removeAt(i);
  }

  getImage(): string {
    return this.f['systemType'].value == 1 ? (this.f['tankType'].value == 1 ? './../../assets/img/fanSystemDiagram/1.png' : './../../assets/img/fanSystemDiagram/2.png') :
    this.f['systemType'].value == 2 ? (this.f['tankType'].value == 1 ? './../../assets/img/fanSystemDiagram/3.png' : './../../assets/img/fanSystemDiagram/4.png') :
    this.f['tankType'].value == 1 ? './../../assets/img/fanSystemDiagram/5.png' : './../../assets/img/fanSystemDiagram/6.png';        
  }

  //Change Events
  unitSystemChanged(value: number) {
    value == 1 ? 
    this.calculationForm.patchValue({
      maxAmbientTemperature: 35,
      maxOperatingTemperature: 80,
      fluidTemperatureAtFilling: 20
    }) :
    this.calculationForm.patchValue({
      maxAmbientTemperature: 95,
      maxOperatingTemperature: 176,
      fluidTemperatureAtFilling: 68
    })
  }

  tankTypeChanged(value: number) {
    value == 1 ?
    (this.f['height'].disable(), this.f['minPressureAtHighestPoint'].disable(), this.f['settingOfPVC'].disable())
    :
    (this.f['height'].enable(), this.f['minPressureAtHighestPoint'].enable(), this.f['settingOfPVC'].enable())
  }

  systemTypeChanged(value: number) {
    value == 3 ? this.f['solarVolume'].enable() : this.f['solarVolume'].disable()
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

  validateMaxAmbientTemperature(control: AbstractControl) {
    let maxAmbientTemperature = control.value;
    
    if (this.f['unitSystem'].value === 2) {
      maxAmbientTemperature = (this.f['maxAmbientTemperature'].value - 32) / 1.8;
    }
    
    if (maxAmbientTemperature < -20 || maxAmbientTemperature > 99) {
      return {maxAmbientTemperatureRange: true}
    }

    return null;
  }

  validateMaxOperatingTemperature(control: AbstractControl) {
    const limits = this.fluidTemperatureRange();
    
    let maxOperatingTemperature = control.value;

    if (this.f['unitSystem'].value == 2) {
      maxOperatingTemperature = (this.f['maxOperatingTemperature'].value - 32) / 1.8;
    }

    if (maxOperatingTemperature < limits.min || maxOperatingTemperature > limits.max) {
      return { maxOperatingTemperatureRange: true };
    };

    return null;
  }

  validateMinPressureAtHighestPoint(control: AbstractControl) {
    let minPressureAtHighestPoint = control.value;

    if (this.f['unitSystem'].value == 1) {
      if (minPressureAtHighestPoint < 0.5) {
        return {minPressureAtHighestPointRange: true}
      }
    } else if (this.f['unitSystem'].value == 2) {
      if (minPressureAtHighestPoint < 10) {
        return {minPressureAtHighestPointRange: true}
      }
    }

    return null;
  }

  validateFluidTemperatureAtFilling(control: AbstractControl) {
    const limits = this.fluidTemperatureRange();
    
    let fluidTemperatureAtFilling = control.value;

    if (this.f['unitSystem'].value == 2) {
      fluidTemperatureAtFilling = (this.f['fluidTemperatureAtFilling'].value - 32) / 1.8;
    }

    if (fluidTemperatureAtFilling < limits.min || fluidTemperatureAtFilling > limits.max) {
      return { fluidTemperatureAtFillingRange: true };
    };

    return null;
  }

  validateCompairisionFluidTemperatureAtFilling(control: AbstractControl) {
    let maxAmbientTemperature = this.f['maxAmbientTemperature'].value;
    let maxOperatingTemperature = this.f['maxOperatingTemperature'].value;
    let fluidTemperatureAtFilling = control.value;

    if (this.f['unitSystem'].value == 2) {
      maxAmbientTemperature = (this.f['maxAmbientTemperature'].value - 32) / 1.8;
      maxOperatingTemperature = (this.f['maxOperatingTemperature'].value - 32) / 1.8;
      fluidTemperatureAtFilling = (this.f['fluidTemperatureAtFilling'].value - 32) / 1.8;  
    }

    if (fluidTemperatureAtFilling > maxOperatingTemperature && fluidTemperatureAtFilling > maxAmbientTemperature) {
      return {comparisionFluidTemperatureAtFilling: true}
    }

    return null;
  }

  validateCompairisionSettingOfPVC(control: AbstractControl) {
    let settingOfPVC = control.value;

    if (this.f['unitSystem'].value == 1) {
      if ((this.f['minPressureAtHighestPoint'].value + (this.f['height'].value * 0.09807)) >= settingOfPVC) {
        return {comparisionSettingOfPSV: true}
      }
    } else if (this.f['unitSystem'].value == 2) {
      if ((this.f['minPressureAtHighestPoint'].value + (this.f['height'].value * 0.43353)) >= settingOfPVC) {
        return {comparisionSettingOfPSV: true}
      }
    }

    return null;
  }

}
