import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      'firstName': new FormControl(''),
      'lastName': new FormControl('')
    })
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }

}
