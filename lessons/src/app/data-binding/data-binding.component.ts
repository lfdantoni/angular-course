import { Component } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent {
  title: string = 'test title';
  inputValue: string = 'test input';
  greeting: string = '';

  list: string[] = ['hello', 'world', '!'];
  remove = false;

  constructor() { }

  onChange(input: string) {
    this.inputValue = input;
  }

  sayHello() {
    this.greeting = 'Hello world!';
  }

  onRemoveClick() {
    this.remove = true;
  }

  onAddText() {
    this.list.push(new Date().getTime().toString());
  }
}
