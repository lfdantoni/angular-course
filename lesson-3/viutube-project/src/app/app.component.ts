import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'viutube-project';
  showLoadVideo = false;
  showListVideos = true;

  loadVideo() {
    this.showLoadVideo = true;
    this.showListVideos = false;
  }

  listVideos() {
    this.showLoadVideo = false;
    this.showListVideos = true;
  }
}
