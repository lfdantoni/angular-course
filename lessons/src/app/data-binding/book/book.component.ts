import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book',
  standalone: false,

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
