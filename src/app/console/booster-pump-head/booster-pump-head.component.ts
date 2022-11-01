import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';

import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';

import { APIService, DataObservableService, FormFactoryService, LookupsService } from '../../_services';

@Component({
  selector: 'app-booster-pump-head',
  templateUrl: './booster-pump-head.component.html',
  styleUrls: ['./booster-pump-head.component.scss']
})
export class BoosterPumpHeadComponent implements OnInit {
  isLoading = true;
  isSubmitting = false;
  isSubmitted = false;
  showResult = false;
  responseData: any = [];

  unitsSystems = this.lookupsService.unitsSFL.unitsSystem;
  flowRates = this.lookupsService.unitsSFL.flowRates[0];
  lengths = this.lookupsService.unitsSFL.lengths[0];
  fluidTypes = this.lookupsService.workingFluid.fluidTypes;

  pipeMaterials = this.lookupsService.pipeType.pipeMaterials;
  standardSystems = this.lookupsService.pipeType.standardSystems;
  sizeStandards = this.lookupsService.pipeType.sizeStandards;

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

  get pipeSections(): FormArray {
    return <FormArray>this.f['pipeSections'];
  }

  get equipments(): FormArray {
    return <FormArray>this.f['equipments'];
  }

  ngOnInit(): void {
    this.calculationForm = this.formBuilder.group({
      project: ['', []],
      system: ['', []],
      pumpRef: ['', []],

      unitSystem: [1, []],
      flowRate: [1, []],
      length: [1, []],

      fluidType: [1, []],
      fluidTemperature: [25, [Validators.required]],
      // fluidTemperatureUnit: ['C', []],

      pipeMaterial: [1, []],
      standardSystem: [1, []],
      sizeStandard: [this.sizeStandards[0][0], []],

      pipeSections: this.formBuilder.array([
        this.formFactoryService.initPipeSection()
      ]),

      equipments: this.formBuilder.array([
        this.formFactoryService.initEquipment()
      ]),

      pumpFlowRate: ['', [Validators.required]],
      i42: ['', [Validators.required]],
      i43: ['', [Validators.required]],
    })
    
    // Add Custom Validators
    this.f['fluidTemperature'].setValidators([Validators.required, this.validateFluidTemperature.bind(this)]);
    this.f['i42'].setValidators([Validators.required, this.validateI42.bind(this)])
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
      'boosterPumpFlag': true,
      'units' : {
        'unitSystem' : {
          'value' : this.f['unitSystem'].value
        },
        'unitFlowRate': {
          'value' : this.f['flowRate'].value
        },
        'unitLength': { 
          'value' : this.f['length'].value
        }
      },
      'workingFluid': {
        'fluidType': {
          'value' : this.f['fluidType'].value
        },
        'fluidTemperature': this.f['fluidTemperature'].value
      },
      'pipeType': {
        'pipeMaterial': {
          'value': this.f['pipeMaterial'].value
        },
        'standardSystem': {
          'value': this.f['standardSystem'].value
        },
        'sizeStandard': {
          'value': this.f['sizeStandard']['value'].value
        }
      },
      
      'pipeSectionWrappers': this.f['pipeSections'].value.map((s: any) => {
        return {
          'sectionId' : s['sectionId'],
          'pipeInfo': {
            'flowRate': s['flowRate']
          },
          'o5': s['length'],
          'pipeSize': {
            'database': s['standard'] === 1 ? true : false,
            'sizeDesign': s['standard'] === 1 ? s['pipeSize'] : s['sizeDesignation'],
            'pipeGradeOrClass': {
              'value': s['standard'] === 1 ? s['pipeGradeOutput'] : null
            },
            'thickness': s['standard'] === 1 ? (s['thickness'] ? s['thickness'] : null) : null,
            'internalDiamter': s['standard'] === 1 ? null : s['internalDiameter']
          },
          'tx5': s['pipeGradeOutputText'],
          'fittings' : s['fittings']?.map((f: any) => {
            return {
              'database': f['standard'] === 1 ? true : false,
              'quantity': f['standard'] === 1 ? f['standardQuantity'] : f['userQuantity'],
              'zetaFactor': f['standard'] === 1 ? null : f['kZetaFactor'],
              'o7': f['standard'] === 1 ? f['type'].label : f['description'],
              'ft': f['standard'] === 1 ? f['type'].value : null              
            }
          }),
          'valves': s['valves']?.map((v: any) => {
            return {
              'database': v['standard'] === 1 ? true : false,
              'material': {
                'value': v['standard'] === 1 ? v['valveMaterial'] : null
              },
              'valveSize': {
                'key': v['standard'] === 1 ? v['valveSize'] : null
              },
              'type': {
                'value': v['standard'] === 1 ? v['type'].value  : null
              },
              'quantity': v['standard'] === 1 ? v['standardQuantity'] : v['userQuantity'],
              'coefficient': v['standard'] === 1 ? null : v['coEfficient'],
              'o11': v['standard'] === 1 ? v['type'].picPath : v['description']
            }
          }),
          'components': s['specialComponents']?.map((c: any) => {
            return {
              'description': c['description'],
              'pressureLoss': c['pressureLoss'],
              'quantity': c['quantity']
            }
          })
        }
      }),
      
      'equipments': this.f['equipments'].value.map((e: any) => {
        return {
          'o26': e['description'],
          'o27': e['model'],
          'o28': e['flowRate'] ? e['flowRate'] : 0,
          'volumeOfLiquidInEquipment': e['pressureLoss'] ? e['pressureLoss'] : 0
        }
      }),
      
      'o31': this.f['pumpFlowRate'].value ? this.f['pumpFlowRate'].value : 0,
      'h' : this.f['i42'] .value,
      'pr' : this.f['i43'] .value,
    }

    this.apiService.calculateBPHead(body).subscribe((res: any) => {
      this.responseData = res['data'];
      this.responseData['project'] = this.f['project'].value;
      this.responseData['system'] = this.f['system'].value;
      this.responseData['pumpRef'] = this.f['pumpRef'].value;

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

  public addPipeSection(sectionAcc: NgbAccordion) {
    this.pipeSections.push(this.formFactoryService.initPipeSection());
    sectionAcc.activeIds = sectionAcc.activeIds + `,` + `section-panel-${sectionAcc.panels.length}`
  }

  public removePipeSection(i: number) {
    this.pipeSections.removeAt(i);
  }

  public addEquipment() {
    this.equipments.push(this.formFactoryService.initEquipment());
  }

  public removeEquipment(i: number) {
    this.equipments.removeAt(i);
  }

  //Change Events
  unitSystemChanged(value: number) {
    this.dataObservableService.unitSystemSubject.next(value);

    this.flowRates = this.lookupsService.unitsSFL.flowRates[value - 1];
    this.f['flowRate'].setValue(1);
    this.flowRateChanged(1);

    this.lengths = this.lookupsService.unitsSFL.lengths[value - 1];
    this.f['length'].setValue(1);
    this.lengthChanged(1);

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

  lengthChanged(value: number) {
    this.dataObservableService.lengthSubject.next(this.lengths[value - 1])
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

  validateI42(control: AbstractControl) {
    if (this.f['length'].value) {
      let tmp: number = Number(control.value) * this.f['length'].value;
      if (tmp < -20 || tmp > 60) {
        return {i42Range: true};
      }
    }
    
    return null;
  }

}
