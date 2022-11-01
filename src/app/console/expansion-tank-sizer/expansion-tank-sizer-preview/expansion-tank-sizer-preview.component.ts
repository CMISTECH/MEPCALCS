import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-expansion-tank-sizer-preview',
  templateUrl: './expansion-tank-sizer-preview.component.html',
  styleUrls: ['./expansion-tank-sizer-preview.component.scss']
})
export class ExpansionTankSizerPreviewComponent implements OnInit {
  @Input() data: any = [];
  @Output() showInput: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  getValue(value: any): any {
    if (value === undefined || value == null || value === '') {
      return '-----';
    }
    if (typeof value === 'number') {
      return value.toFixed(2);
    }
    return value;
  }

  getQtyValue(value: any): any {
    if (value === undefined || value == null || value === '') {
      return '-----';
    }
    if (typeof value === 'number') {
      return value.toFixed(0);
    }
    return value;
  }

  stpl(ps: any): number {
    let v: number = 0.0;
    if (this.isNum(ps.o6)) {
      v += ps.o6;
    }
    if (this.isNum(ps.o18)) {
      v += ps.o18;
    }
    if (this.isNum(ps.o19)) {
      v += ps.o19;
    }
    if (this.isNum(ps.o20)) {
      v += ps.o20;
    }
    return this.getValue(v);
  }

  isNum(value: any): boolean {
    return value !== undefined && value != null && typeof value === 'number';
  }

  getDate(value: number): string {
    if (value === undefined || value == null) {
      return '-----';
    }
    return new Date(value).toLocaleString();
  }

  generatePDF() {
    var docDefinition: any = {
      pageSize: 'A4',
      pageMargins: [40, 128, 40, 40],

      header: {
        margin: [40, 40],
        layout: 'noBorders',
        table: {
          widths: ['*'],
          body: [
            [
              {
                text: 'EXPANSION TANK SIZER CALCULATION', style: 'mainHeader'
              }
            ],
            [
              {
                text: 'Tank Information', style: 'subHeader'
              }
            ],
            [
              {
                table: {
                  widths: ['*', '*', '*', '*'],
                  body: [
                    [
                      { text: 'Project' }, { text: this.getValue(this.data['info'].project), bold: true },
                      { text: 'Date' }, { text: this.getDate(this.data.dateTime), bold: true }
                    ],
                    [
                      { text: 'Expansion Tank Ref' }, { text: this.getValue(this.data['info'].expansionTankRef), bold: true, colSpan: 3 },
                      {}, {}
                    ]
                  ]
                }
              }
            ]
          ]
        }
      },
      footer: function (currentPage: number, pageCount: number) {
        return {
          text: 'Page ' + currentPage.toString() + ' of ' + pageCount, alignment: 'center'
        }
      },
      content: [
        // 1. System Volume
        {
          unbreakable: true,
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                { text: '1. System Volume', style: 'sectionHeader' }
              ],
              [
                {
                  table: {
                    widths: ['*', '*', '*', '*', '*', '*'],
                    body: [
                      [
                        { text: 'Fluid Volume in Pipes and Tanks', colSpan: 5 },
                        {}, {}, {}, {},
                        { text: this.getValue(this.data['systemVolume'].volumeOfLiquidInPipes) + ' ' + (this.data['unitSystem'] == 1 ? 'm³' : 'US Gallon'), alignment: 'center' }
                      ],
                      [
                        { text: 'Fluid Volume in Equipment', colSpan: 6 },
                        {}, {}, {}, {}, {}
                      ],
                      // Section Repeater
                      ...this.data['systemVolume'].equipments.map((equipment: any, index: number) => (
                        [
                          { style: 'nestedContent', text: equipment['desc'], colSpan: 5 },
                          {}, {}, {}, {},
                          { text: this.getValue(equipment['volumeOfLiquidInEquipment']) + ' ' + (this.data['unitSystem'] == 1 ? 'm³' : 'US Gallon'), alignment: 'center' }
                        ]
                      )),
                      // Section Repeater End
                      [
                        { text: 'Fluid Volume in Solar Field', colSpan: 5 },
                        {}, {}, {}, {},
                        { text: this.getValue(this.data['systemVolume'].volumeOfLiquidInSolar) + ' ' + (this.data['unitSystem'] == 1 ? 'm³' : 'US Gallon'), alignment: 'center' }
                      ],
                      [
                        { text: 'Total System Volume', alignment: 'right', bold: true, colSpan: 5 },
                        {}, {}, {}, {},
                        { text: this.getValue(this.data['totalSystemVolume']) + ' ' + (this.data['unitSystem'] == 1 ? 'm³' : 'US Gallon'), alignment: 'center', bold: true }
                      ]
                    ]
                  }
                }
              ]
            ]
          }
        },
        // 2. Expansion Volume
        {
          unbreakable: true,
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: '2. Expansion Volume',
                  style: 'sectionHeader'
                }
              ],
              [
                {
                  table: {
                    widths: ['*', '*', '*', '*', '*', '*'],
                    body: [
                      [
                        { text: 'Filling Temperature', colSpan: 5 },
                        {}, {}, {}, {},
                        { text: this.getValue(this.data['expansionVolume'].minTemp) + ' ' + (this.data['unitSystem'] == 1 ? '°C' : '°F'), alignment: 'center' }
                      ],
                      [
                        { text: 'Max Temperature', colSpan: 5 },
                        {}, {}, {}, {},
                        { text: this.getValue(this.data['expansionVolume'].maxTemp) + ' ' + (this.data['unitSystem'] == 1 ? '°C' : '°F'), alignment: 'center' }
                      ],
                      [
                        { text: 'Density@ Filling Temperature', colSpan: 5 },
                        {}, {}, {}, {},
                        { text: this.getValue(this.data['expansionVolume'].minDen) + ' ' + (this.data['unitSystem'] == 1 ? 'kg/m' : 'lb/ft³'), alignment: 'center' }
                      ],
                      [
                        { text: 'Density@ Max Temperature', colSpan: 5 },
                        {}, {}, {}, {},
                        { text: this.getValue(this.data['expansionVolume'].maxDen) + ' ' + (this.data['unitSystem'] == 1 ? 'kg/m' : 'lb/ft³'), alignment: 'center' }
                      ],
                      [
                        { text: 'Expansion Volume', alignment: 'right', bold: true, colSpan: 5 },
                        {}, {}, {}, {},
                        { text: this.getValue(this.data['expansionVolume'].expansionVolume) + ' ' + (this.data['unitSystem'] == 1 ? 'm³' : 'US Gallon'), alignment: 'center', bold: true }
                      ]
                    ]
                  }
                }
              ]
            ]
          }
        },
        // 3. System Pressure
        {
          unbreakable: true,
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: '3. System Pressure',
                  style: 'sectionHeader'
                }
              ],
              [
                {
                  table: {
                    widths: ['*', '*', '*', '*', '*', '*'],
                    body: [
                      [
                        { text: 'Filling System Pressure at the Tank', colSpan: 5 },
                        {}, {}, {}, {},
                        { text: this.getValue(this.data['systemPressure'].minPre) + ' ' + (this.data['unitSystem'] == 1 ? 'barg' : 'PSIG'), alignment: 'center' }
                      ],
                      [
                        { text: 'Max System Pressure at the Tank', colSpan: 5 },
                        {}, {}, {}, {},
                        { text: this.getValue(this.data['systemPressure'].maxPre) + ' ' + (this.data['unitSystem'] == 1 ? 'barg' : 'PSIG'), alignment: 'center' }
                      ]
                    ]
                  }
                },
              ]
            ]
          }
        },
        
        // 4. Expansion Tank Characteristics
        {
          unbreakable: true,
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: '4. Expansion Tank Characteristics',
                  style: 'sectionHeader'
                }
              ],
              [
                {
                  table: {
                    widths: ['*', '*', '*', '*', '*', '*'],
                    body: [
                      [
                        { text: 'Tank Type' },
                        { text: this.getValue(this.data['expChar'].tankType), colSpan: 2 }, {},
                        { text: 'System Type' },
                        { text: this.getValue(this.data['expChar'].systemType), colSpan: 2 }, {},
                      ],
                      [
                        { text: 'Net Content / Acceptance Volume', colSpan: 5 },
                        {}, {}, {}, {},
                        { text: this.getValue(this.data['expansionVolume'].expansionVolume) + ' ' + (this.data['unitSystem'] == 1 ? 'm³' : 'US Gallon'), alignment: 'center' }
                      ],
                      [
                        { text: 'Min Tank Volume', colSpan: 5 },
                        {}, {}, {}, {},
                        { text: this.getValue(this.data['expChar'].minTVol) + ' ' + (this.data['unitSystem'] == 1 ? 'm³' : 'US Gallon'), alignment: 'center' }
                      ],
                      [
                        { text: 'Initial (Pre-Charge) Tank Pressure', colSpan: 5 },
                        {}, {}, {}, {},
                        { text: this.getValue(this.data['expChar'].initPre) + ' ' + (this.data['unitSystem'] == 1 ? 'barg' : 'PSIG'), alignment: 'center' }
                      ],
                      [
                        { text: '* The tank is sized to take the expansion volume and the volume of liquid in the solar field in case of over heat', colSpan: 6 },
                        {}, {}, {}, {}, {}
                      ]
                    ]
                  }
                }
              ]
            ]
          }
        }
      ],

      defaultStyle: {
        fontSize: 11
      },
      styles: {
        mainHeader: {
          bold: true,
          fontSize: 14,
          alignment: 'center'
        },
        subHeader: {
          bold: true,
          fontSize: 12,
          alignment: 'center',
          margin: [0, 4, 0, 4]
        },
        sectionHeader: {
          bold: true,
          fontSize: 12,
          alignment: 'left',
          margin: [0, 8, 0, 8]
        },
        sectionSubHeader: {
          bold: true,
          fontSize: 11,
          alignment: 'center'
        },
        nestedContent: {
          italics: true,
          margin: [24, 0, 0, 0]
        },
        noMargins: {
          margin: [-5, -3, -5, -3]
        }
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }

}




// this.data['tankType'] == 2 ? [
//   {
//     unbreakable: true,
//     layout: 'noBorders',
//     table: {
//       widths: ['*'],
//       body: [
//         [
//           {
//             text: '3. System Pressure',
//             style: 'sectionHeader'
//           }
//         ],
//         [
//           {
//             table: {
//               widths: ['*', '*', '*', '*', '*', '*'],
//               body: [
//                 [
//                   { text: 'Filling System Pressure at the Tank', colSpan: 5 },
//                   {}, {}, {}, {},
//                   { text: this.getValue(this.data['systemPressure'].minPre) + ' ' + (this.data['unitSystem'] == 1 ? 'barg' : 'PSIG'), alignment: 'center' }
//                 ],
//                 [
//                   { text: 'Max System Pressure at the Tank', colSpan: 5 },
//                   {}, {}, {}, {},
//                   { text: this.getValue(this.data['systemPressure'].maxPre) + ' ' + (this.data['unitSystem'] == 1 ? 'barg' : 'PSIG'), alignment: 'center' }
//                 ]
//               ]
//             }
//           },
//         ]
//       ]
//     }
//   }
// ] : [],