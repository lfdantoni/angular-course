import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [ButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SharedModule { }
