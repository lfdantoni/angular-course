import { Component, OnInit } from '@angular/core';
import Video from '../../models/video';
import { VideoService } from 'src/app/services/video/video.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { HttpErrorResponse } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http'; // it should be in the service

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.css']
})
export class ListVideosComponent implements OnInit {
  videos: Video[];
  isLoading = false;
  messageError: string;

  constructor(private videoService: VideoService, 
              private logger: LoggerService) {

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
