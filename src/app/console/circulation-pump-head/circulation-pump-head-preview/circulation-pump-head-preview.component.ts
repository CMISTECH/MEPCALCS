import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-circulation-pump-head-preview',
  templateUrl: './circulation-pump-head-preview.component.html',
  styleUrls: ['./circulation-pump-head-preview.component.scss']
})
export class CirculationPumpHeadPreviewComponent implements OnInit {
  @Input() data: any = [];
  @Output() showInput: EventEmitter<any> = new EventEmitter<any>();

  constructor() { 
    console.log(this.data)
  }

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

  stpl(pipeSection: any): number {
    let v: number = 0.0;
    if (this.isNum(pipeSection.o6)) {
      v += pipeSection.o6;
    }
    if (this.isNum(pipeSection.o18)) {
      v += pipeSection.o18;
    }
    if (this.isNum(pipeSection.o19)) {
      v += pipeSection.o19;
    }
    if (this.isNum(pipeSection.o20)) {
      v += pipeSection.o20;
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
                text: 'CIRCULATION PUMP HEAD CALCULATOR',
                style: 'mainHeader'
              }
            ],
            [
              {
                text: 'Pump Information',
                style: 'subHeader'
              }
            ],
            [
              {
                table: {
                  widths: ['*', '*', '*', '*'],
                  body: [
                    [
                      { text: 'Project' }, { text: this.getValue(this.data.project), bold: true },
                      { text: 'Date' }, { text: this.getDate(this.data.date), bold: true }
                    ],
                    [
                      { text: 'System' }, { text: this.getValue(this.data.system), bold: true },
                      { text: 'Pump Ref' }, { text: this.getValue(this.data.pumpRef), bold: true }
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
        //Important Remarks
        {
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                { text: 'Important Remarks', style: 'sectionHeader' }

              ],
              [
                {
                  ul: [
                    'Pressure drop in straight pipe is calculated using the most accurate method (Darcy-Weisbach equation).',
                    'Pressure drop in fittings is calculated using k or zeta coefficient which depends on geometry and size.',
                    'Pressure drop in valves is calculated using valve coefficient Kv or Cv.'
                  ]
                }
              ]
            ]
          }
        },
        //Pipe Sections
        {
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: '1. Pipe Sections', style: 'sectionHeader'
                }
              ],
              //Section Repeater
              ...this.data.pipeSections.map((pipeSection: any, index: number) => (
                [
                  {
                    unbreakable: true,
                    table: {
                      widths: ['*', '*', '*', '*', '*', '*'],
                      body: [
                        [
                          { text: 'Section' + ' ' + (index + 1), bold: true, },
                          { text: this.getValue(pipeSection.sectionId), bold: true, colSpan: 5 },
                          {}, {}, {}, {}
                        ],
                        [
                          { text: 'Flow Rate' }, { text: this.getValue(pipeSection.o3) + ' ' + this.getValue(this.data.tx1), bold: true },
                          { text: 'Flow Velocity' }, { text: this.getValue(pipeSection.o4) + ' ' + this.getValue(pipeSection.tx2), bold: true },
                          { text: 'Pipe Size' }, { text: this.getValue(pipeSection.o44), bold: true }
                        ],
                        [
                          { text: 'Pipe Material' }, { text: this.getValue(pipeSection.o45), bold: true, colSpan: 2 }, {},
                          { text: 'Size Standard' }, { text: this.getValue(pipeSection.tx4), bold: true, colSpan: 2 }, {}
                        ],
                        [
                          { text: 'Grad/Class' }, { text: this.getValue(pipeSection.tx5), bold: true, colSpan: 5 }, {}, {}, {}, {}
                        ],
                        //Straight Pipe
                        [
                          { text: 'Straight Pipe', style: 'sectionSubHeader', colSpan: 6 }, {}, {}, {}, {}, {}
                        ],
                        [
                          {
                            style: 'noMargins',
                            colSpan: 6,
                            table: {
                              widths: ['*', 'auto'],
                              body: [
                                [
                                  { text: 'Length' },
                                  { text: 'Pressure Loss' }
                                ],
                                [
                                  { text: this.getValue(pipeSection.o5) + ' ' + this.getValue(pipeSection.tx6) },
                                  { text: this.getValue(pipeSection.o6) + ' ' + this.getValue(this.data.tx7) }
                                ]
                              ]
                            }
                          }
                        ],
                        //Fittings
                        [
                          { text: 'Fittings', style: 'sectionSubHeader', colSpan: 6 }, {}, {}, {}, {}, {}
                        ],
                        [
                          {
                            style: 'noMargins',
                            colSpan: 6,
                            table: {
                              widths: ['*', 'auto', 'auto', 'auto'],
                              body: [
                                [
                                  { text: 'Type' },
                                  { text: 'K-Factor', alignment: 'center' },
                                  { text: 'Qty', alignment: 'center' },
                                  { text: 'Pressure Loss', alignment: 'center' }
                                ],
                                ...pipeSection.fittings.map((fitting: any, index: number) => (
                                  [
                                    { text: this.getValue(fitting.o7) },
                                    { text: this.getValue(fitting.o8), alignment: 'center' },
                                    { text: this.getValue(fitting.o9), alignment: 'center' },
                                    { text: this.getValue(fitting.o10) + ' ' + this.getValue(this.data.tx7), alignment: 'center' }
                                  ]
                                )),
                                [
                                  { text: 'Total', alignment: 'right', bold: true, colSpan: 3 },
                                  {},
                                  {},
                                  { text: this.getValue(pipeSection.o18) + ' ' + this.getValue(this.data.tx7), alignment: 'center', bold: true }
                                ]
                              ]
                            }
                          }
                        ],
                        //Valves
                        [
                          { text: 'Valves', style: 'sectionSubHeader', colSpan: 6 }, {}, {}, {}, {}, {}
                        ],
                        [
                          {
                            style: 'noMargins',
                            colSpan: 6,
                            table: {
                              widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto'],
                              body: [
                                [
                                  { text: 'Material' },
                                  { text: 'Type' },
                                  { text: 'Size', alignment: 'center' },
                                  { text: this.getValue(pipeSection.tx8), alignment: 'center' },
                                  { text: 'Qty', alignment: 'center' },
                                  { text: 'Pressure Loss', alignment: 'center' }
                                ],
                                ...pipeSection.valves.map((valve: any, index: number) => (
                                  [
                                    { text: this.getValue(valve.o33) },
                                    { text: this.getValue(valve.o11) },
                                    { text: this.getValue(valve.o34), alignment: 'center' },
                                    { text: this.getValue(valve.o12), alignment: 'center' },
                                    { text: this.getValue(valve.o13), alignment: 'center' },
                                    { text: this.getValue(valve.o14) + ' ' + this.getValue(this.data.tx7), alignment: 'center' }
                                  ]
                                )),
                                [
                                  { text: 'Total', alignment: 'right', bold: true, colSpan: 5 },
                                  {},
                                  {},
                                  {},
                                  {},
                                  { text: this.getValue(pipeSection.o19) + ' ' + this.getValue(this.data.tx7), alignment: 'center', bold: true }
                                ]
                              ]
                            }
                          }
                        ],
                        //Special Components
                        [
                          { text: 'Special Components', style: 'sectionSubHeader', colSpan: 6 }, {}, {}, {}, {}, {}
                        ],
                        [
                          {
                            style: 'noMargins',
                            colSpan: 6,
                            table: {
                              widths: ['*', 'auto', 'auto'],
                              body: [
                                [
                                  { text: 'Type' },
                                  { text: 'Qty', alignment: 'center' },
                                  { text: 'Pressure Loss', alignment: 'center' }
                                ],
                                ...pipeSection.specialComponents.map((specialComponent: any, index: number) => (
                                  [
                                    { text: this.getValue(specialComponent.o15) },
                                    { text: this.getValue(specialComponent.o16), alignment: 'center' },
                                    { text: this.getValue(specialComponent.o17) + ' ' + this.getValue(this.data.tx7), alignment: 'center' }
                                  ]
                                )),
                                [
                                  { text: 'Total', alignment: 'right', bold: true, colSpan: 2 },
                                  {},
                                  { text: this.getValue(pipeSection.o20) + ' ' + this.getValue(this.data.tx7), alignment: 'center', bold: true }
                                ]
                              ]
                            }
                          }
                        ],
                        //Section Pressure Loss
                        [
                          { text: 'SECTION TOTAL PRESSURE LOSS - ' + this.stpl(pipeSection) + ' ' + this.getValue(this.data.tx7), alignment: 'center', bold: true, colSpan: 6 }, {}, {}, {}, {}, {}
                        ]
                      ]
                    }
                  }
                ]
              ))
            ]
          }
        },
        // Pipe Sections Pressure Loss Summary
        {
          unbreakable: true,
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: '2. Pipe Sections Pressure Loss Summary',
                  style: 'sectionHeader'
                }
              ],
              [
                {
                  table: {
                    widths: ['*', '*', '*', '*'],
                    body: [
                      [
                        { text: 'Straight Pipes', alignment: 'center' },
                        { text: 'Fittings', alignment: 'center' },
                        { text: 'Valves', alignment: 'center' },
                        { text: 'Special Components', alignment: 'center' }
                      ],
                      [
                        { text: this.getValue(this.data.o21) + ' ' + this.getValue(this.data.tx7), alignment: 'center' },
                        { text: this.getValue(this.data.o22) + ' ' + this.getValue(this.data.tx7), alignment: 'center' },
                        { text: this.getValue(this.data.o23) + ' ' + this.getValue(this.data.tx7), alignment: 'center' },
                        { text: this.getValue(this.data.o24) + ' ' + this.getValue(this.data.tx7), alignment: 'center' }
                      ],
                      [
                        { text: 'TOTAL PRESSURE LOSS -' + ' ' + this.getValue(this.data.o25) + ' ' + this.getValue(this.data.tx7), alignment: 'center', bold: true, colSpan: 4 },
                        {},
                        {},
                        {}
                      ]
                    ]
                  }
                }
              ]
            ]
          }
        },
        // Equipments
        {
          unbreakable: true,
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: '3. Equipments',
                  style: 'sectionHeader'
                }
              ],
              [
                {
                  table: {
                    widths: ['auto', '*', '*', 'auto', 'auto'],
                    body: [
                      [
                        { text: 'Equipment' },
                        { text: 'Description' },
                        { text: 'Model' },
                        { text: 'Flow Rate', alignment: 'center' },
                        { text: 'Pressure Loss', alignment: 'center' },
                      ],
                      ...this.data.equipments.map((equipment: any, index: number) => (
                        [
                          { text: 'Equipment' + ' ' + (index + 1) },
                          { text: this.getValue(equipment.o26) },
                          { text: this.getValue(equipment.o27) },
                          { text: this.getValue(equipment.o28) + ' ' + this.getValue(this.data.tx1), alignment: 'center' },
                          { text: this.getValue(equipment.o29) + ' ' + this.getValue(this.data.tx7), alignment: 'center' },
                        ]
                      )),
                      [
                        { text: 'Total', alignment: 'right', bold: true, colSpan: 4 },
                        {},
                        {},
                        {},
                        { text: this.getValue(this.data.o30) + ' ' + this.getValue(this.data.tx7), alignment: 'center', bold: true },
                      ]
                    ]
                  }
                },
              ]
            ]
          }
        },
        // Pump Head & Flow
        {
          unbreakable: true,
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: '4. Pump Head & Flow',
                  style: 'sectionHeader'
                }
              ],
              [
                {
                  table: {
                    widths: ['*', '*', '*', '*'],
                    body: [
                      [
                        { text: 'Pump Flow Rate' }, { text: this.getValue(this.data.o31) + ' ' + this.getValue(this.data.tx1), bold: true },
                        { text: 'Pump Head' }, { text: this.getValue(this.data.o32) + ' ' + this.getValue(this.data.tx7), bold: true }
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
