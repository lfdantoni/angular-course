import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'book-store-feature-module';
  loadingRouteConfig: boolean = false;

  constructor (private router: Router) {}

  ngOnInit () {
      this.router.events.subscribe(event => {
          if (event instanceof RouteConfigLoadStart) {
              this.loadingRouteConfig = true;
          } else if (event instanceof RouteConfigLoadEnd) {
              this.loadingRouteConfig = false;
          }
      });
  }
}
