import { Component } from '@angular/core';
import { Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-colorlensicon',
  templateUrl: './colorlensicon.component.html',
  styleUrls: ['./colorlensicon.component.scss']
})
export class ColorlensiconComponent {
  @Output() colorSelected = new EventEmitter<string>();
  colors: string[] = [
    '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8',
    '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed'
  ];

  selectColor(color: string) {
    this.colorSelected.emit(color);
  }
}
