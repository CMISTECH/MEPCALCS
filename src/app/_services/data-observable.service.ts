import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DataObservableService {
    isSubmitted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    
    unitSystemSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    flowRateSubject: BehaviorSubject<any> = new BehaviorSubject<any>({ label: "I/s", uf: 1 });
    lengthSubject: BehaviorSubject<any> = new BehaviorSubject<any>({ label: "m", ul: 1 });
    
    pipeMaterialSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    pipeStandardSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    
    constructor(){}
    
}