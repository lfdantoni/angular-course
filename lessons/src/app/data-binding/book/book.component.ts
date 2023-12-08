import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() name: string = '';
  @Output() valueChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  sendValue(target: EventTarget|null): void {
    this.valueChanged.emit((<HTMLInputElement>target).value)
  }

}
