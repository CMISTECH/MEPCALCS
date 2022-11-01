import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  constructor(private formBuilder: FormBuilder) {
  }

  getEquipmentForm(value?: any): FormGroup {
    const formGroup: FormGroup = this.formBuilder.group({});
    formGroup.addControl('description', new FormControl(value ? value.description : '', []));
    formGroup.addControl('model', new FormControl(value ? value.model : '', []));
    formGroup.addControl('flowRate', new FormControl(value ? value.flowRate : '', []));
    formGroup.addControl('pressureDrop', new FormControl(value ? value.pressureDrop : '', []));
    return formGroup;
  }

  getPipeSectionForm(value?: any): FormGroup {
    const formGroup: FormGroup = this.formBuilder.group({});
    formGroup.addControl('sectionId', new FormControl('', [Validators.required]));
    formGroup.addControl('flowRate', new FormControl('', [Validators.required]));
    formGroup.addControl('length', new FormControl('', [Validators.required]));
    formGroup.addControl('standard', new FormControl(1, [Validators.required]));
    formGroup.addControl('pipeSizeStandard', this.getPipeSizeStandardGroup());
    formGroup.addControl('pipeSizeUserDefined', this.getPipeSizeUserDefinedGroup());
    formGroup.addControl('fittings', this.formBuilder.array([]));
    formGroup.addControl('valves', this.formBuilder.array([]));
    formGroup.addControl('specialComponents', this.formBuilder.array([]));
    return formGroup;
  }

  getFittingsForm(value?: any): FormGroup {
    const formGroup: FormGroup = this.formBuilder.group({});
    formGroup.addControl('standard', new FormControl(1, [Validators.required]));
    formGroup.addControl('fittingsStandard', this.getFittingsStandardGroup());
    formGroup.addControl('fittingsUserDefined', this.getFittingsUserDefinedGroup());
    return formGroup;
  }

  getValvesForm(value?: any): FormGroup {
    const formGroup: FormGroup = this.formBuilder.group({});
    formGroup.addControl('standard', new FormControl(1, [Validators.required]));
    formGroup.addControl('valveStandard', this.getValveStandardGroup());
    formGroup.addControl('valveUserDefined', this.getValveUserDefinedGroup());
    return formGroup;
  }

  getValvesStandardForm(valve: any): FormGroup {
    const formGroup: FormGroup = this.formBuilder.group({});
    formGroup.addControl('standard', new FormControl(1, [Validators.required]));
    formGroup.addControl('valveStandard', this.getValveStandardTypeGroup(valve.valveStandard.type));
    formGroup.addControl('valveUserDefined', this.getValveUserDefinedGroup());
    return formGroup;
  }

  getSpecialComponentsForm(value?: any): FormGroup {
    const formGroup: FormGroup = this.formBuilder.group({});
    formGroup.addControl('description', new FormControl('', [Validators.required]));
    formGroup.addControl('pressureDrop', new FormControl('', [Validators.required]));
    formGroup.addControl('qty', new FormControl('', [Validators.required]));
    return formGroup;
  }

  getPipeSizeStandardGroup(): FormGroup {
    return this.formBuilder.group({
      pipeGrade: [2, [
        Validators.required
      ]],
      pipeSize: [1, [
        Validators.required
      ]],
      thickness: [{ value: '', disabled: true }, [
        Validators.required
      ]]
    });
  }

  getPipeSizeUserDefinedGroup(): FormGroup {
    return this.formBuilder.group({
      sizeDesignation: [{ value: '', disabled: true }, [
        Validators.required
      ]],
      internalDiameter: [{ value: '', disabled: true }, [
        Validators.required
      ]]
    });
  }

  getFittingsStandardGroup(): FormGroup {
    return this.formBuilder.group({
      type: ['', [
        Validators.required
      ]],
      qty: ['', [
        Validators.required
      ]]
    });
  }

  getFittingsUserDefinedGroup(): FormGroup {
    return this.formBuilder.group({
      description: [{ value: '', disabled: true }, [
        Validators.required
      ]],
      kOrZetaFactor: [{ value: '', disabled: true }, [
        Validators.required
      ]],
      userQty: [{ value: '', disabled: true }, [
        Validators.required
      ]]
    });
  }

  getValveStandardTypeGroup(type: any): FormGroup {
    return this.formBuilder.group({
      material: [1, [
        Validators.required
      ]],
      size: ['', [
        Validators.required
      ]],
      type: [type, [
        Validators.required
      ]],
      qty: ['', [
        Validators.required
      ]]
    });
  }

  getValveStandardGroup(): FormGroup {
    return this.formBuilder.group({
      material: [1, [
        Validators.required
      ]],
      size: ['', [
        Validators.required
      ]],
      type: ['', [
        Validators.required
      ]],
      qty: ['', [
        Validators.required
      ]]
    });
  }

  getValveUserDefinedGroup(): FormGroup {
    return this.formBuilder.group({
      description: [{ value: '', disabled: true }, [
        Validators.required
      ]],
      coefficient: [{ value: '', disabled: true }, [
        Validators.required
      ]],
      userQty: [{ value: '', disabled: true }, [
        Validators.required
      ]]
    });
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };

  formHasControls(form: FormGroup | FormArray): boolean {
    return Object.keys(form.controls).length !== 0;
  }
}
