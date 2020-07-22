import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {
  title = 'App Component';
  greeting: string;
  inputValue: string;

  list: string[] = ['hello', 'world', '!'];
  remove = false;

  ngOnInit(): void {
  }

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
