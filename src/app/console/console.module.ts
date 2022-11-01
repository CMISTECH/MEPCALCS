import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './_shared/shared.module';
import { ConsoleRoutingModule, RoutingComponents } from './console-routing.module';

import { CirculationPumpHeadPreviewComponent } from './circulation-pump-head/circulation-pump-head-preview/circulation-pump-head-preview.component';
import { BoosterPumpHeadPreviewComponent } from './booster-pump-head/booster-pump-head-preview/booster-pump-head-preview.component';
import { PipeSizerPreviewComponent } from './pipe-sizer/pipe-sizer-preview/pipe-sizer-preview.component';
import { ExpansionTankSizerPreviewComponent } from './expansion-tank-sizer/expansion-tank-sizer-preview/expansion-tank-sizer-preview.component';


@NgModule({
    declarations: [
        RoutingComponents,
        CirculationPumpHeadPreviewComponent,
        BoosterPumpHeadPreviewComponent,
        PipeSizerPreviewComponent,
        ExpansionTankSizerPreviewComponent        
    ],
    imports: [
        CommonModule,
        SharedModule,
        ConsoleRoutingModule
    ],
    providers: []
})
export class ConsoleModule { }