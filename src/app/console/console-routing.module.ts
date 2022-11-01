import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsoleComponent } from './console.component';
import { HomeComponent } from './home/home.component';

import { CirculationPumpHeadComponent } from './circulation-pump-head/circulation-pump-head.component';
import { BoosterPumpHeadComponent } from './booster-pump-head/booster-pump-head.component';
import { PipeSizerComponent } from './pipe-sizer/pipe-sizer.component';
import { ExpansionTankSizerComponent } from './expansion-tank-sizer/expansion-tank-sizer.component';
import { PumpsAffinityLawsComponent } from './pumps-affinity-laws/pumps-affinity-laws.component';
import { PumpPowerComponent } from './pump-power/pump-power.component';

import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: ConsoleComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'circulation-pump-head',
                component: CirculationPumpHeadComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'booster-pump-head',
                component: BoosterPumpHeadComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'pipe-sizer',
                component: PipeSizerComponent                
            },
            {
                path: 'expansion-tank-sizer',
                component: ExpansionTankSizerComponent,
                canActivate: [AuthGuard]                
            },
            {
                path: 'pumps-affinity-laws',
                component: PumpsAffinityLawsComponent                
            },
            {
                path: 'pumps-power-laws',
                component: PumpPowerComponent                
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsoleRoutingModule { }
export const RoutingComponents = [
    ConsoleComponent, 
    HomeComponent,
    
    CirculationPumpHeadComponent, BoosterPumpHeadComponent, PipeSizerComponent,
    ExpansionTankSizerComponent, PumpsAffinityLawsComponent, PumpPowerComponent    
]