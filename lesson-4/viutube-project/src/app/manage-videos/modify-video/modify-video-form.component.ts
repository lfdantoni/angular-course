import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { VideoService } from 'src/app/shared/services/video/video.service';
import { LoggerService } from 'src/app/shared/services/logger/logger.service';
import { DateLoggerService } from 'src/app/shared/services/date-logger/date-logger.service';
import { ActivatedRoute } from '@angular/router';
import { pipe } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-modify-video-form',
  templateUrl: './modify-video-form.component.html',
  styleUrls: ['./modify-video-form.component.css'],
  providers: [{provide: LoggerService, useClass: DateLoggerService}]
})
export class ModifyVideoFormComponent implements OnInit {
  videoId: string;
  loadVideoFG: FormGroup;

  private urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  private urlImagePattern = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

  constructor(private videoService: VideoService, private logger: LoggerService,
              private route: ActivatedRoute) {
    this.loadVideoFG = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(10)]),
      'description': new FormControl(''),
      'imageUrl': new FormControl('', [Validators.required, Validators.pattern(this.urlImagePattern)]),
      'videoUrl': new FormControl('', [Validators.required, Validators.pattern(this.urlPattern)])
    });

    this.logger.log('AddVideoFormComponent created');

    this.route.params.subscribe((params) => {
      this.videoId = params['id'];

      if(this.videoId) {
        this.videoService.getVideoById(this.videoId)
        .pipe(first())
        .subscribe(video => {

          // I can't set the video object directly because of it has the _id property and 
          // the form doesn't have this one
          this.loadVideoFG.setValue({
            name: video.name,
            description: video.description,
            imageUrl: video.imageUrl,
            videoUrl: video.videoUrl
          }); // load video to the form
        })
      }
    });
  }

  ngOnInit() {
  }

  saveVideo() {
    console.log(this.loadVideoFG.value);
    
    this.videoService.addVideo(this.loadVideoFG.value)
      .subscribe(data => {
        console.log(data);
        this.loadVideoFG.reset();
      });
  }

  updateVideo() {
    this.videoService.updateVideo(this.loadVideoFG.value)
      .subscribe(data => {
        console.log(data);
        this.loadVideoFG.reset();
      });
  }

  deleteVideo() {
    this.videoService.removeVideo(this.name.value)
    .subscribe(data => {
      console.log(data);
      this.loadVideoFG.reset();
    });
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
