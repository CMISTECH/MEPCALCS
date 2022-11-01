import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LookupsService {
    pipeSizes: any = [];
    fittingTypes: any = [];
    valveSizes: any = [];
    valveTypes: any = [];

    systemTypes: any = [];
    tankTypes: any = [];
    pipingMaterials: any = [];
    
    unitsSFLLookups = {
        unitsSystem: [
            { label: "SI", value: 1, key: "UU1" },
            { label: "Imperial", value: 2, key: "UU2" }
        ],
        flowRates: [
            [
                { label: "I/s", value: 1, key: "UF1", uf: 1 },
                { label: "m^3/hr", value: 2, key: "UF2", uf: 0.2778 }
            ],
            [
                { label: "CFM (ft^3/m)", value: 1, unit: "ft^3/m", key: "UF3", uf: 0.4719 },
                { label: "GPM (US)", value: 2, unit: "US", key: "UF4", uf: 0.0631 },
                { label: "GPM (UK)", value: 3, unit: "UK", key: "UF5", uf: 0.0758 }
            ]
        ],
        lengths: [
            [
                { label: "m", value: 1, unit: "m", ul: 1 },
                { label: "mm", value: 2, unit: "mm", ul: 0.001 },
            ],
            [
                { label: "ft", value: 1, unit: "ft", ul: 0.3048 },
                { label: "yd", value: 2, unit: "yd", ul: 0.9144 },
                { label: "inch", value: 3, unit: "minchm", ul: 0.0254 }
            ]
        ]
    };
    workingFluidLookups = {
        fluidTypes: [
            { 
                label: "Water", value: 1, key: "cat1", min: 5, max: 100,
                rho: {
                    a: -0.000000000014823,
                    b: 0.000000005795766,
                    c: -0.000000979003076,
                    d: 0.000100399414805,
                    e: -0.009556485958456,
                    f: 0.081621854216792,
                    g: 999.819343182723000
                }
            },
            { 
                label: "50% Ethylene Glycol", 
                value: 2, 
                key: "cat2",
                min: -20, 
                max: 110, 
                rho: {
                    a: -0.000000000000398,
                    b: 0.000000000082742,
                    c: -0.000000000917873,
                    d: -0.000000730626175,
                    e: -0.002392775728277,
                    f: -0.338618562340280,
                    g: 1082.276243938760000
                  }
            },
            { 
                label: "40% Ethylene Glycol", value: 3, key: "cat3", min: -20, max: 110, 
                rho: {
                    a: 0.000000000002069,
                    b: -0.000000000744992,
                    c: 0.000000091008968,
                    d: -0.000003973118256,
                    e: -0.002428307223166,
                    f: -0.305697357585464,
                    g: 1068.004659777180000
                }
            },
            { 
                label: "30% Ethylene Glycol", value: 4, key: "cat4", min: -10, max: 105, 
                rho: {
                    a: -0.000000000006954,
                    b: 0.000000002374017,
                    c: -0.000000291153302,
                    d: 0.000014766929172,
                    e: -0.002659266558221,
                    f: -0.280327460225510,
                    g: 1052.978876093750000
                }

            },
            { 
                label: "20% Ethylene Glycol", value: 5, key: "cat5", min: -5, max: 105, 
                rho: {
                    a: 0.000000000002631,
                    b: -0.000000001065887,
                    c: 0.000000156761750,
                    d: -0.000009812736368,
                    e: -0.002222391189078,
                    f: -0.248223290407141,
                    g: 1036.808620378120000
                }
            },
            { 
                label: "10% Ethylene Glycol", value: 6, key: "cat6", min: 0, max: 105, 
                rho: {
                    a: 0.000000000005160,
                    b: -0.000000001593633,
                    c: 0.000000172312827,
                    d: -0.000007783600950,
                    e: -0.002273539197631,
                    f: -0.224052097008098,
                    g: 1019.895345252930000
                }  
            },
            { 
                label: "50% Propylene Glycol", value: 7, key: "cat7", min: -20, max: 110, 
                rho: {
                    a: -0.000000000003059,
                    b: 0.000000000942804,
                    c: - 0.000000087014350,
                    d: 0.000001514498229,
                    e: - 0.002468269754228,
                    f: - 0.443265294966010,
                    g: 1053.853795005150000
                } 
            },
            { 
                label: "40% Propylene Glycol", value: 8, key: "cat8", min: -20, max: 105, 
                rho: {
                    a: 0.000000000001451,
                    b: - 0.000000000335705,
                    c: 0.000000013147509,
                    d: 0.000001387004418,
                    e: - 0.002653823397917,
                    f: - 0.393255652503839,
                    g: 1046.309902439820000
                } 
            },
            { 
                label: "30% Propylene Glycol", value: 9, key: "cat9", min: -10, max: 105, 
                rho: {
                    a: 0.000000000001805,
                    b: - 0.000000000706821,
                    c: 0.000000099528324,
                    d: - 0.000006129356002,
                    e: - 0.002402710786309,
                    f: - 0.344701715193623,
                    g: 1037.403648871940000
                } 
            },
            { 
                label: "20% Propylene Glycol", value: 10, key: "cat10", min: -5, max: 105, 
                rho: {
                    a: 0.000000000003392,
                    b: - 0.000000001645824,
                    c: 0.000000269601748,
                    d: - 0.000018254691807,
                    e: - 0.002051555972205,
                    f: - 0.293994899567146,
                    g: 1026.984665732250000
                }
            },
            { 
                label: "10% Propylene Glycol", value: 11, key: "cat11", min: 0, max: 100, rho: {
                    a: 0.000000000007525,
                    b: - 0.000000002680698,
                    c: 0.000000346618567,
                    d: - 0.000019347478656,
                    e: - 0.002039559120021,
                    f: - 0.238698776462115,
                    g: 1015.001572918320000
                } 
            }
        ]
    };
    pipeTypeLookups = {
        pipeMaterials: [
            { label: "Carbon/Black Steel", value: 1, key: "pm1" },
            { label: "Galvanized Steel", value: 2, key: "pm2" },
            { label: "Copper", value: 3, key: "pm3" },
            { label: "Chlorinated polyvinyl chloride (CPVC//PVC)", value: 4, key: "pm4" },
            { label: "High-density polyethylene (HDPE)", value: 5, key: "pm5" },
            { label: "Polypropylene Random (PPR)", value: 6, key: "pm6" }
        ],
        standardSystems: [
            { label: "American Standard (ASTM)", value: 1, key: "SS1" },
            { label: "European Norm (EN)", value: 2, key: "SS2" }
        ],
        sizeStandards: [
            [
                { value: 1, label: "ASTM A53 Gr A&B", key: "ps1" },
                { value: 2, label: "EN 10255 for pipe sizes smaller than or equal 150mm EN 10220 for pipe sizes larger than 150mm", key: "ps2" }
            ],
            [
                { value: 1, label: "ASTM A53 Gr A&B", key: "ps1" },
                { value: 2, label: "EN 10255 for pipe sizes smaller than or equal 150mm EN 10220 for pipe sizes larger than 150mm", key: "ps2" }
            ],
            [
                { value: 3, label: "ASTM B88", key: "ps3" },
                { value: 4, label: "EN 1057", key: "ps4" }
            ],
            [
                { value: 5, label: "ASTM F441", key: "ps5" },
                { value: 6, label: "EN 15493", key: "ps6" }
            ],
            [
                { value: 7, label: "ASTM D3035", key: "ps7" },
                { value: 8, label: "EN 12201", key: "ps8" },
            ],
            [
                { value: 9, label: "ASTM F2389", key: "ps9" },
                { value: 10, label: "EN 15874", key: "ps10" },
            ]
        ]
    };
    pipeSizeLookups = {
        pipeGrades: [
            [
                { label: "Sch 10", value: 1, key: "pg1.1" },
                { label: "Sch 40", value: 2, default: true, key: "pg1.2" },
                { label: "Sch 80", value: 3, key: "pg1.3" }
            ],
            [
                { label: "Light (L2) /EN 10255", value: 1, key: "pg2.1" },
                { label: "Light (L1) /EN 10255", value: 2, key: "pg2.2" },
                { label: "Light (L) /EN 10255", value: 3, key: "pg2.3" },
                { label: "Medium (M) /EN 10255", value: 4, key: "pg2.4", default: true },
                { label: "Heavy (H)/EN 10255", value: 5, key: "pg2.5" },
                { label: "EN 10220", value: 6, key: "pg2.6" }
            ],
            [
                { label: "Type K", value: 1, key: "pg3.1" },
                { label: "Type L", value: 2, key: "pg3.2", default: true },
                { label: "Type M", value: 3, key: "pg3.3" },
                { label: "Type DWV", value: 4, key: "pg3.4" }
            ],
            [
                { label: "Annealed (R220)", value: 1, key: "pg4.1" },
                { label: "Half Hard (R250)", value: 2, key: "pg4.2", default: true },
                { label: "Hard (R290)", value: 3, key: "pg4.3" }
            ],
            [
                { label: "Sch 40", value: 1, key: "pg5.1", default: true },
                { label: "Sch 80", value: 2, key: "pg5.2" }
            ],
            [
                { label: "SDR 41", value: 1, key: "pg6.1" },
                { label: "SDR 26", value: 2, key: "pg6.2" },
                { label: "SDR 21", value: 3, key: "pg6.3" },
                { label: "SDR 17", value: 4, key: "pg6.4" },
                { label: "SDR 13.6", value: 5, key: "pg6.5" },
                { label: "SDR 11", value: 6, key: "pg6.6", default: true },
                { label: "SDR 9", value: 7, key: "pg6.7" }
            ],
            [
                { label: "DR 7", value: 1, key: "pg7.1" },
                { label: "DR 9", value: 2, key: "pg7.2" },
                { label: "DR 11", value: 3, key: "pg7.3", default: true },
                { label: "DR 13.5", value: 4, key: "pg7.4" },
                { label: "DR 17", value: 5, key: "pg7.5" },
                { label: "DR 19", value: 6, key: "pg7.6" },
                { label: "DR 21", value: 7, key: "pg7.7" },
                { label: "DR 26", value: 8, key: "pg7.8" },
                { label: "DR 32.5", value: 9, key: "pg7.9" }
            ],
            [
                { label: "SDR 41", value: 1, key: "pg8.1" },
                { label: "SDR 33", value: 2, key: "pg8.2" },
                { label: "SDR 26", value: 3, key: "pg8.3" },
                { label: "SDR 21", value: 4, key: "pg8.4" },
                { label: "SDR 17", value: 5, key: "pg8.5" },
                { label: "SDR 13.6", value: 6, key: "pg8.6" },
                { label: "SDR 11", value: 7, key: "pg8.7", default: true },
                { label: "SDR 9", value: 8, key: "pg8.8" },
                { label: "SDR 7.4", value: 9, key: "pg8.9" },
                { label: "SDR 6", value: 10, key: "pg8.11" }
            ],
            [
                { label: "SDR 41", value: 1, key: "pg9.1" },
                { label: "SDR 33", value: 2, key: "pg9.2" },
                { label: "SDR 26", value: 3, key: "pg9.3" },
                { label: "SDR 17.6", value: 4, key: "pg9.4" },
                { label: "SDR 17", value: 5, key: "pg9.5" },
                { label: "SDR 11", value: 6, key: "pg9.6", default: true },
                { label: "SDR 9", value: 7, key: "pg9.7" },
                { label: "SDR 7.4", value: 8, key: "pg9.8" },
                { label: "SDR 6", value: 9, key: "pg9.9" },
                { label: "SDR 5", value: 10, key: "pg9.11" }
            ],
            [
                { label: "SDR 41", value: 1, key: "pg10.1" },
                { label: "SDR 33", value: 2, key: "pg10.2" },
                { label: "SDR 26", value: 3, key: "pg10.3" },
                { label: "SDR 17.6", value: 4, key: "pg10.4" },
                { label: "SDR 17", value: 5, key: "pg10.5" },
                { label: "SDR 11", value: 6, key: "pg10.6", default: true },
                { label: "SDR 9", value: 7, key: "pg10.7" },
                { label: "SDR 7.4", value: 8, key: "pg10.8" },
                { label: "SDR 6", value: 9, key: "pg10.9" },
                { label: "SDR 5", value: 10, key: "pg10.11" }
            ]
        ]
    }
    fittingsLookups = {
        types: [
            { label: "ft1", value: 1, key: "ft1" },
            { label: "ft2", value: 2, key: "ft2" },
            { label: "ft3", value: 3, key: "ft3" },
            { label: "ft4", value: 4, key: "ft4" },
            { label: "ft5", value: 5, key: "ft5" },
            { label: "ft6", value: 6, key: "ft6" }
        ]
    }
    valveLookups = {
        valveMaterial: [
            { label: "Metallic (Bronze, Brass, Ductile Iron … etc)", value: 1 },
            { label: "CPVC / PVC", value: 2 },
            { label: "HDPE / PE", value: 3 },
            { label: "PPR", value: 4 }
        ],
        valveSizes: [
            [
                { label: "1.1", value: 1 },
                { label: "1.2", value: 2 },
                { label: "1.3", value: 3 },
                { label: "1.4", value: 4 }
            ],
            [
                { label: "2.1", value: 1 },
                { label: "2.2", value: 2 },
                { label: "2.3", value: 3 },
                { label: "2.4", value: 4 }
            ]
        ],
        valveTypes: [
            [
                { label: "1.1", value: 1 },
                { label: "1.2", value: 2 },
                { label: "1.3", value: 3 },
                { label: "1.4", value: 4 }
            ],
            [
                { label: "2.1", value: 1 },
                { label: "2.2", value: 2 },
                { label: "2.3", value: 3 },
                { label: "2.4", value: 4 }
            ]
        ]
    }

    constructor() {
    }

    get unitsSFL() {
        return this.unitsSFLLookups;
    }

    get workingFluid() {
        return this.workingFluidLookups;
    }

    get pipeType() {
        return this.pipeTypeLookups;
    }

    get pipeSize() {
        return this.pipeSizeLookups;
    }

    get fittings() {
        return this.fittingsLookups;
    }

    get valves() {
        return this.valveLookups;
    }    
}