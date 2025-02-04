import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    DataBindingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lessons-standalone';
}
