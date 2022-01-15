import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent{
  @Input() name: string = '';
  @Output() valueChanged = new EventEmitter<string>()

  constructor() { }

  sendValue(target: EventTarget | null): void {
    if(target) {
      this.valueChanged.emit((target as HTMLInputElement).value)
    }
  }

}
