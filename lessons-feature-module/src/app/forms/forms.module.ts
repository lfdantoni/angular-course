import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsPageComponent } from './forms-page.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';
import { SharedModule } from '../shared/shared.module';
import { FormsRoutingModule } from './forms-routing.module';



@NgModule({
  declarations: [
    FormsPageComponent,
    ReactiveFormComponent,
    TemplateDrivenFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsRoutingModule
  ]
})
export class FormsModule { }
