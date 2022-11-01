export const UnitSystems: any[] = [
    { label: "SI", value: 1, key: "UU1" },
    { label: "Imperial", value: 2, key: "UU2" }
]

export const FlowRates: any[] = [
    [
        { label: "I/s", value: 1, key: "UF1", uf: 1 },
        { label: "m^3/hr", value: 2, key: "UF2", uf: 0.2778 }
    ],
    [
        { label: "CFM (ft^3/m)", value: 1, unit: "ft^3/m", key: "UF3", uf: 0.4719 },
        { label: "GPM (US)", value: 2, unit: "US", key: "UF4", uf: 0.0631 },
        { label: "GPM (UK)", value: 3, unit: "UK", key: "UF5", uf: 0.0758 }
    ]
]

export const Lengths: any[] = [
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

export const FluidTypes: any[] = [
    { label: "Water", value: 1, key: "cat1" },
    { label: "50% Ethylene Glycol", value: 2, key: "cat2" },
    { label: "40% Ethylene Glycol", value: 3, key: "cat3" },
    { label: "30% Ethylene Glycol", value: 4, key: "cat4" },
    { label: "20% Ethylene Glycol", value: 5, key: "cat5" },
    { label: "10% Ethylene Glycol", value: 6, key: "cat6" },
    { label: "50% Propylene Glycol", value: 7, key: "cat7" },
    { label: "40% Propylene Glycol", value: 8, key: "cat8" },
    { label: "30% Propylene Glycol", value: 9, key: "cat9" },
    { label: "20% Propylene Glycol", value: 10, key: "cat10" },
    { label: "10% Propylene Glycol", value: 11, key: "cat11" }
]

export const PipeMaterials: any[] = [
    { label: "Carbon/Black Steel", value: 1, key: "pm1" },
    { label: "Galvanized Steel", value: 2, key: "pm2" },
    { label: "Copper", value: 3, key: "pm3" },
    { label: "Chlorinated polyvinyl chloride (CPVC//PVC)", value: 4, key: "pm4" },
    { label: "High-density polyethylene (HDPE)", value: 5, key: "pm5" },
    { label: "Polypropylene Random (PPR)", value: 6, key: "pm6" }
]

export const StanderedSystems: any[] = [
    { label: "American Standard (ASTM)", value: 1, key: "SS1" },
    { label: "European Norm (EN)", value: 2, key: "SS2" }
]

export const sizeStandereds: any[] = [
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
