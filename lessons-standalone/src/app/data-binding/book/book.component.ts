import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-book',
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  @Input() name: string = '';
  @Output() valueChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  sendValue(target: EventTarget|null): void {
    this.valueChanged.emit((<HTMLInputElement>target).value)
  }
}
