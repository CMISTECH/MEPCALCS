import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

import { DataObservableService, FormFactoryService, LookupsService } from '../../../_services';

@Component({
  selector: 'app-valve',
  templateUrl: './valve.component.html',
  styleUrls: ['./valve.component.scss']
})
export class ValveComponent implements OnInit {
  @Input() isSubmitted!: boolean;
  @Input() valveForm: FormGroup = new FormGroup({});
  
  unitSystem!: number;
  // flowRate!: any;
  // length!: any;

  valveMaterials = this.lookupsService.valveLookups.valveMaterial;
  valveSizes = this.lookupsService.valveSizes[0]; 
  volveTypes = this.lookupsService.valveTypes[0];
  
  // pipeGrades = this.lookupsService.pipeSize.pipeGrades[0];
  // pipeSizes = this.lookupsService.pipeSizes['pg1.2'];
  

  constructor(
    // private formFactoryService: FormFactoryService,
    private lookupsService: LookupsService,
    private dataObservableService: DataObservableService
  ) { }

  get f() { return this.valveForm['controls']; }

  ngOnInit(): void {
    this.dataObservableService.unitSystemSubject.subscribe((res: any) => {
      this.unitSystem = res;
    })
  }

  //Change Events
  materialChanged(value: number) {
    this.f['valveSize'].setValue('')        
  }

  pipeSizeChanged(value: number) {
    this.volveTypes = this.valveSizes[this.f['valveMaterial'].value - 1].find((s: any) => s.value === value).types;    
  }

  flipStandardPipeSize() {
    if (this.f['standard'].value === 1) {
      this.f['valveMaterial'].enable()
      this.f['valveSize'].enable()
      this.f['type'].enable()
      this.f['standardQuantity'].enable()
      
      this.f['description'].disable()
      this.f['coEfficient'].disable()
      this.f['userQuantity'].disable()
    } else if (this.f['standard'].value === 2) {
      this.f['valveMaterial'].disable()
      this.f['valveSize'].disable()
      this.f['type'].disable()
      this.f['standardQuantity'].disable()
      
      this.f['description'].enable()
      this.f['coEfficient'].enable()
      this.f['userQuantity'].enable()
    }
  }

  selectType(type: any) {
    this.f['type'].setValue(type);    
  }

}
