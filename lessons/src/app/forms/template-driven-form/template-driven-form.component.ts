import { Component, OnInit } from '@angular/core';
import { countries } from '../../mock-data/countries';

interface MyModel {
  comment?: string;
  countryCode: string;
  age: number;
  gender: string;
  tc: boolean;
}

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css']
})
export class TemplateDrivenFormComponent implements OnInit {
  myModel: MyModel = { countryCode: '', age: 0, gender: '', tc: false };
  countries = countries;

  constructor() { }

  ngOnInit(): void {
  }

  // receiving the form value is optional if we are using model binding (myModel)
  onSubmit(value: any): void {
    console.log('Form value: ', value);
    console.log('myModel: ', this.myModel);

    // this.myModel.comment = 'test'
  }

}
