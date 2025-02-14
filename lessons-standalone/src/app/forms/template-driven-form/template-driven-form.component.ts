import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { countries } from '../../mock-data/countries';
import { CustomForbiddenValueValidatorDirective } from '../../directives/validators/custom-forbidden-value-validator.directive';

interface MyModel {
  comment?: string;
  countryCode: string;
  age: number;
  gender: string;
  tc: boolean;
}

@Component({
  selector: 'app-template-driven-form',
  imports: [FormsModule, CustomForbiddenValueValidatorDirective],
  templateUrl: './template-driven-form.component.html',
  styleUrl: './template-driven-form.component.css'
})
export class TemplateDrivenFormComponent {
  myModel: MyModel = { countryCode: '', age: 0, gender: '', tc: false };
  countries = countries;

  // receiving the form value is optional if we are using model binding (myModel)
  onSubmit(value: any): void {
    console.log('Form value: ', value);
    console.log('myModel: ', this.myModel);

    // this.myModel.comment = 'test'
  }
}
