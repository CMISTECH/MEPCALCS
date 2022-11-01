import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms'  
import { ReactiveFormsModule} from '@angular/forms' 

import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AccountRoutingModule, RoutingComponents } from './account-routing.module';

@NgModule({
    declarations: [
        RoutingComponents
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        NgSelectModule, NgbModule,
        AccountRoutingModule
    ],
    providers: []
})
export class AccountModule { }