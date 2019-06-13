import { Component, OnInit } from '@angular/core';

class MyModel {
  comment?: string;
}

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css']
})
export class TemplateDrivenFormComponent implements OnInit {
  myModel: MyModel = {};

  constructor() { }

  ngOnInit() {
  }

  onSubmit(value: any) {
    console.log(value);
    console.log(this.myModel);
  }
}
