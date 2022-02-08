import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataBindingPageComponent } from './data-binding-page.component';
import { DataBindingRoutingModule } from './data-binding-routing.module';
import { FilterComponent } from './filter/filter.component';
import { CategoryComponent } from './category/category.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    DataBindingPageComponent,
    FilterComponent,
    CategoryComponent,
  ],
  imports: [
    CommonModule,
    DataBindingRoutingModule,
    SharedModule
  ]
})
export class DataBindingModule { }
