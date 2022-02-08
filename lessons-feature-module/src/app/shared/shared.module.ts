import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HighLightDirective } from './directives/high-light.directive';



@NgModule({
  declarations: [
    HighLightDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HighLightDirective
  ]
})
export class SharedModule { }
