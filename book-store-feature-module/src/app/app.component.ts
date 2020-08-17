import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-store';

  constructor() {
    // it is for emulating a login process, saving the jwt session in the localStorage
    // it is NOT the correct way, check the following link out for doing the login process correctly
    // https://dev.to/gokayokyay/api-authentication-workflow-with-jwt-and-refresh-tokens-5312
    localStorage.setItem('user', 'administrator');
  }
}
