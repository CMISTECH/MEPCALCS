import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormFactoryService {

    constructor(private formBuilder: FormBuilder) { }

    initPipeSection(): FormGroup {
        return this.formBuilder.group({
            sectionId: ['', [Validators.required]],
            flowRate: ['', [Validators.required]],
            length: ['', [Validators.required]],
            
            standard: [1, []],
            
            pipeGrade: ['', []],
            pipeSize: ['', []],
            thickness: [{ value: '', disabled: true }, [Validators.required]],
            
            sizeDesignation: [{ value: '', disabled: true }, [Validators.required]],
            internalDiameter: [{ value: '', disabled: true }, [Validators.required]],
            
            pipeGradeOutput: ['', []],
            pipeGradeOutputText: ['', []],

            fittings: this.formBuilder.array([]),
            valves: this.formBuilder.array([]),
            specialComponents: this.formBuilder.array([])
        })
    }

    initFitting(): FormGroup {
        return this.formBuilder.group({
            standard: [1, []],
            
            type: ['', [Validators.required]],
            standardQuantity: ['', [Validators.required]],
            
            description: [{ value: '', disabled: true }, [Validators.required]],
            kZetaFactor: [{ value: '', disabled: true }, [Validators.required]],
            userQuantity: [{ value: '', disabled: true }, [Validators.required]]
        })
    }

    initValve(): FormGroup {
        return this.formBuilder.group({
            standard: [1, []],
            
            valveMaterial: [1, []],
            valveSize: ['', [Validators.required]],
            type: ['', [Validators.required]],
            standardQuantity: ['', [Validators.required]],
            
            description: [{ value: '', disabled: true }, [Validators.required]],
            coEfficient: [{ value: '', disabled: true }, [Validators.required]],
            userQuantity: [{ value: '', disabled: true }, [Validators.required]]
        })
    }

    initSpecialComponent(): FormGroup {
        return this.formBuilder.group({
            description: ['', [Validators.required]],
            pressureLoss: ['', [Validators.required]],
            quantity: ['', [Validators.required]],
        })
    }

    initEquipment(): FormGroup {
        return this.formBuilder.group({
            description: ['', []],
            model: ['', []],
            flowRate: ['', []],
            pressureLoss: ['', []]
        })
    }

    initFluidVolumeEquipment(): FormGroup {
        return this.formBuilder.group({
            description: ['', [Validators.required]],
            fluidVolume: [0, [Validators.required]]            
        })
    }
}