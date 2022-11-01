import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms'  
import { ReactiveFormsModule} from '@angular/forms' 
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { SimplebarAngularModule } from 'simplebar-angular';

import { PipeSectionComponent } from './pipe-section/pipe-section.component';
import { FittingComponent } from './fitting/fitting.component';
import { ValveComponent } from './valve/valve.component';

import { LoaderComponent } from './loader/loader.component';

@NgModule({
    declarations: [PipeSectionComponent, FittingComponent, ValveComponent,  LoaderComponent ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        NgSelectModule, 
        NgbModule, NgbDropdownModule,
        SimplebarAngularModule
    ],
    exports: [
        FormsModule, ReactiveFormsModule,
        NgSelectModule, 
        NgbModule, NgbDropdownModule,
        
        PipeSectionComponent,
        FittingComponent,
        ValveComponent,
        LoaderComponent
    ],
    providers: []
})
export class SharedModule { }