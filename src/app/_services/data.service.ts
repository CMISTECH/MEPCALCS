import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    // for changing unit system drop down in units component 
    private unitSystemSource = new BehaviorSubject<number>(1);
    public currentUnitSystem = this.unitSystemSource.asObservable();
    // for changing flow rate unit drop down in units component 
    private flowRateUnitSource = new BehaviorSubject<any>({ label: "I/s", uf: 1 });
    public currentflowRateUnit = this.flowRateUnitSource.asObservable();
    // for changing length unit drop down in units component 
    private lengthUnitSource = new BehaviorSubject<any>({ label: "m", ul: 1 });
    public currentLengthUnit = this.lengthUnitSource.asObservable();
    // for changing standard system drop down in pipe type component 
    private pipeStandardSystemSource = new BehaviorSubject<number>(1);
    public currentPipeStandardSystem = this.pipeStandardSystemSource.asObservable();
    // for changing standard system drop down in pipe type component 
    private pipeStandardSource = new BehaviorSubject<number>(1);
    public currentPipeStandard = this.pipeStandardSource.asObservable();
    // flag for tg2 (user defined) pipe size
    private isStandardPipeSizeSource = new BehaviorSubject<boolean>(true);
    public currentIsStandardPipeSize = this.isStandardPipeSizeSource.asObservable();
    constructor() { }

    changeUnitSystem(unit: number): void {
        this.unitSystemSource.next(unit);
    }
    changeFlowRateUnit(unit: any): void {
        this.flowRateUnitSource.next(unit);
    }
    changeLengthUnit(unit: any): void {
        this.lengthUnitSource.next(unit);
    }

    changePipeStandardSystem(system: number): void {
        this.pipeStandardSystemSource.next(system);
    }
    changePipeStandard(standard: number): void {
        this.pipeStandardSource.next(standard);
    }

    changeIsStandardPipeSize(standard: boolean): void {
        this.isStandardPipeSizeSource.next(standard);
    }

}
