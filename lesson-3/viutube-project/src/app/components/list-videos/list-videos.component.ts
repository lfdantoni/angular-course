import { Component, OnInit, Inject, Optional } from '@angular/core';
import Video from '../../models/video';
import { VideoService } from 'src/app/services/video/video.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { PageProperties } from 'src/app/models/PageProperties';
import { TITLE } from 'src/app/services/injection-tokens';
import { OptionalService } from 'src/app/services/optional/optional.service';
import { HttpErrorResponse } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http'; // it should be in the service

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.css'],
  providers: [
    {provide: TITLE, useValue: 'Change'},
    OptionalService // we can remove it because of it is optional on this component
  ]
})
export class ListVideosComponent implements OnInit {
  videos: Video[];
  isLoading = false;
  messageError: string;

  constructor(private videoService: VideoService, 
              private logger: LoggerService,
              private pageProperties: PageProperties,
              @Inject(TITLE) title: string,
              @Optional() private optionalService: OptionalService,
              // private http: HttpClient
  ) {
    // const videoService = new VideoService(); // new service instance, it is NOT the same of the load one
    
    // we need to wait till get them from the http response
    // this.videos = videoService.videos;
    // this.logger.log({
    //   description: 'ListVideosComponent constructor',
    //   data: videoService.videos
    // })

    console.log('ListVideosComponent constructor -> pageProperties: ', this.pageProperties);
    console.log('ListVideosComponent constructor -> TITLE: ', title);

    if (this.optionalService) { // we always have to check it because of this service is optional
      console.log('Optional Service has been initializing');
    } else {
      console.log('Optional Service has not been initializing');
    }

    // we shouldn't do that because we can't reuse it in other components
    // this.http.get('http://demo7376228.mockable.io/api/videos')
    //   .subscribe(data => {
    //     console.log('Videos from http: ', data);
    //   });


    // getting videos from a http call
    this.isLoading = true;
    this.videoService.getVideos()
      .subscribe(videos => {
        this.isLoading = false;
        this.videos = videos;
      },
      error => this.handleError(error))
  }

  ngOnInit() {
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    this.messageError = `Status code: ${error.status} - message: ${error.message}`;
    this.isLoading = false;
  }

}
