import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pipe-sizer-preview',
  templateUrl: './pipe-sizer-preview.component.html',
  styleUrls: ['./pipe-sizer-preview.component.scss']
})
export class PipeSizerPreviewComponent implements OnInit {
  @Input() data: any;
  @Output() showInput: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    
  }

}
