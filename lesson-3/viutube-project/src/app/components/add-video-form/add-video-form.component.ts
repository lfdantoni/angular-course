import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-add-video-form',
  templateUrl: './add-video-form.component.html',
  styleUrls: ['./add-video-form.component.css']
})
export class AddVideoFormComponent implements OnInit {
  loadVideoFG: FormGroup;

  private urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  private urlImagePattern = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
  constructor() {
    this.loadVideoFG = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(10)]),
      'description': new FormControl(''),
      'imageUrl': new FormControl('', [Validators.required, Validators.pattern(this.urlImagePattern)]),
      'videoUrl': new FormControl('', [Validators.required, Validators.pattern(this.urlPattern)])
    })
  }

  ngOnInit() {
  }

  saveVideo() {
    console.log(this.loadVideoFG.value);
    this.loadVideoFG.reset();
  }

  get imageUrl(): AbstractControl {
    return this.loadVideoFG.get('imageUrl')
  }

  get name(): AbstractControl {
    return this.loadVideoFG.get('name')
  }

  get videoUrl(): AbstractControl {
    return this.loadVideoFG.get('videoUrl')
  }
}
