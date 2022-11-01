import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { DataObservableService, LookupsService } from '../../_services';

@Component({
  selector: 'app-pumps-affinity-laws',
  templateUrl: './pumps-affinity-laws.component.html',
  styleUrls: ['./pumps-affinity-laws.component.scss']
})
export class PumpsAffinityLawsComponent implements OnInit {
  
  unitsSystems = this.lookupsService.unitsSFL.unitsSystem;

  calculationForm!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private lookupsService: LookupsService,
  ) { }

  get f() { return this.calculationForm['controls']; }

  ngOnInit(): void {
    this.calculationForm = this.formBuilder.group({
      unitSystem: [1, []],
      
      initialSpeed: [0, [Validators.required]],
      newSpeed: [0, [Validators.required]],
      
      initialImpellerDia: [0, [Validators.required]],
      newImpellerDia: [0, [Validators.required]],
      
      flowRate: [0, [Validators.required]],
      head: [0, [Validators.required]],
      power: [0, [Validators.required]]       
    })
  }

  get newFlowRate() : number {
    return this.f['flowRate'].value * (this.f['newSpeed'].value / this.f['initialSpeed'].value) * (this.f['newImpellerDia'].value / this.f['initialImpellerDia'].value);
  }
  
  get newHead() : number {
    return this.f['head'].value * Math.pow(this.f['newSpeed'].value / this.f['initialSpeed'].value, 2) * Math.pow(this.f['newImpellerDia'].value / this.f['initialImpellerDia'].value, 2);
  }
  
  get newPower() : number {
    return this.f['power'].value * Math.pow(this.f['newSpeed'].value / this.f['initialSpeed'].value, 3) * Math.pow(this.f['newImpellerDia'].value / this.f['initialImpellerDia'].value, 3);
  }
  

}
