import { Component, OnInit } from '@angular/core';
import Video from '../../models/video';
import { VideoService } from 'src/app/services/video/video.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { PageProperties } from 'src/app/models/PageProperties';

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.css']
})
export class ListVideosComponent implements OnInit {
  videos: Video[];

  constructor(private videoService: VideoService, 
              private logger: LoggerService,
              private pageProperties: PageProperties) {
    // const videoService = new VideoService(); // new service instance, it is NOT the same of the load one
    this.videos = videoService.videos;
    this.logger.log({
      description: 'ListVideosComponent constructor',
      data: videoService.videos
    })

    console.log('ListVideosComponent constructor -> pageProperties: ', this.pageProperties);
  }

  ngOnInit() {
  }

}
