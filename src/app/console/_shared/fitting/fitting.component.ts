import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DataObservableService, LookupsService } from '../../../_services';

@Component({
  selector: 'app-fitting',
  templateUrl: './fitting.component.html',
  styleUrls: ['./fitting.component.scss']
})
export class FittingComponent implements OnInit {
  @Input() isSubmitted!: boolean;
  @Input() fittingForm: FormGroup = new FormGroup({});
  
  fittingTypes = this.lookupsService.fittingTypes[0];

  constructor(
    private lookupsService: LookupsService,
    private dataObservableService: DataObservableService
  ) { 
    
  }

  get f() { return this.fittingForm['controls']; }

  ngOnInit(): void {
    this.dataObservableService.pipeMaterialSubject.subscribe((res: any) => {
      this.fittingTypes = this.lookupsService.fittingTypes[res - 1]
    })
  }

  //Change Events
  flipStandardPipeSize() {
    if (this.f['standard'].value === 1) {
      this.f['type'].enable()
      this.f['standardQuantity'].enable()
      
      this.f['description'].disable()
      this.f['kZetaFactor'].disable()
      this.f['userQuantity'].disable()
    } else if (this.f['standard'].value === 2) {
      this.f['type'].disable()
      this.f['standardQuantity'].disable()
      
      this.f['description'].enable()
      this.f['kZetaFactor'].enable()
      this.f['userQuantity'].enable()
    }
  }

  selectType(type: any) {
    this.f['type'].setValue(type);        
  }

}
