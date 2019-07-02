import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { VideoService } from 'src/app/shared/services/video/video.service';
import { LoggerService } from 'src/app/shared/services/logger/logger.service';
import { DateLoggerService } from 'src/app/shared/services/date-logger/date-logger.service';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe } from 'rxjs';
import { first } from 'rxjs/operators';
import Video from 'src/app/shared/models/video';

@Component({
  selector: 'app-modify-video-form',
  templateUrl: './modify-video-form.component.html',
  styleUrls: ['./modify-video-form.component.css'],
  providers: [{provide: LoggerService, useClass: DateLoggerService}]
})
export class ModifyVideoFormComponent implements OnInit {
  videoId: string;
  loadVideoFG: FormGroup;
  isLoading = false;

  private urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  private urlImagePattern = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

  constructor(private videoService: VideoService, private logger: LoggerService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.loadVideoFG = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(10)]),
      'description': new FormControl(''),
      'imageUrl': new FormControl('', [Validators.required, Validators.pattern(this.urlImagePattern)]),
      'videoUrl': new FormControl('', [Validators.required, Validators.pattern(this.urlPattern)])
    });

    this.logger.log('AddVideoFormComponent created');

    this.activatedRoute.params.subscribe((params) => {
      this.videoId = params['id'];

      if(this.videoId) {
        this.isLoading = true;
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

          this.isLoading = false;
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
    this.isLoading = true;
    const videoToUpdate: Video = {
       _id: this.videoId,
       name: this.name.value,
       imageUrl: this.imageUrl.value,
       videoUrl: this.videoUrl.value,
       description: this.description.value
    }
    this.videoService.updateVideo(videoToUpdate)
      .subscribe(data => {
        this.isLoading = false;
      });
  }

  deleteVideo() {
    this.videoService.removeVideo(this.videoId)
    .subscribe(data => {
      console.log(data);
      this.loadVideoFG.reset();
      this.router.navigate(['/list']);
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

  get description(): AbstractControl {
    return this.loadVideoFG.get('description')
  }
}
