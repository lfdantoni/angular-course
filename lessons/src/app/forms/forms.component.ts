import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    console.log(this.activateRoute.snapshot.queryParams)
  }

}
