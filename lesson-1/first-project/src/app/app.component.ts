import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // component selector
  templateUrl: './app.component.html', // component template
  styleUrls: ['./app.component.css'] // component styles
})
export class AppComponent {
  title = 'App Component';
  greeting: string;
  inputValue: string;

  list: string[] = ['hello', 'world', '!'];
  remove = false;

  sayHello() {
    this.greeting = 'Hello world!';
  }

  onChange(value: string) {
    this.inputValue = value;
  }

  onRemoveClick() {
    this.remove = true;
  }

  onAddText() {
    this.list.push(new Date().getTime().toString());
  }
}
