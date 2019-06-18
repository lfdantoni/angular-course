import { Component, OnInit } from '@angular/core';
import Video from '../../models/video';
import { VideoService } from 'src/app/services/video/video.service';

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.css']
})
export class ListVideosComponent implements OnInit {
  videos: Video[];

  constructor(private videoService: VideoService) {
    // const videoService = new VideoService(); // new service instance, it is NOT the same of the load one
    this.videos = videoService.videos;
  }

  ngOnInit() {
  }

}
