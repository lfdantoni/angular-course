import { Component } from '@angular/core';
import { BookComponent } from './book/book.component';
import { CommonModule } from '@angular/common';
import { HighLightDirective } from '../directives/high-light.directive';

@Component({
  selector: 'app-data-binding',
  imports: [
    BookComponent,
    CommonModule, // to use *ngIf, *ngFor, etc  - no built-in Control flow
    HighLightDirective,
  ],
  templateUrl: './data-binding.component.html',
  styleUrl: './data-binding.component.css'
})
export class DataBindingComponent {
  title: string = 'test title';
  inputValue: string = 'test input';
  greeting: string = '';

  list: string[] = [];
  remove = false;

  constructor() { }

  onKeyup(event: KeyboardEvent) {
    this.inputValue = (<HTMLInputElement>event.target).value;
  }

  sayHello() {
    this.greeting = 'Hello world!';
  }

  onRemoveClick() {
    this.remove = true;
  }

  onAddText() {
    console.log('Adding text');
    this.list.push(new Date().getTime().toString());
  }

  logValue(value: string) {
    console.log('Value:', value)
  }
}
