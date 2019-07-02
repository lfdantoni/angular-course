import { Component, OnInit } from '@angular/core';
import Video from '../../shared/models/video';
import { VideoService } from 'src/app/shared/services/video/video.service';
import { LoggerService } from 'src/app/shared/services/logger/logger.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { first } from 'rxjs/operators';
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
              private logger: LoggerService,
              public dialog: MatDialog) {

    // getting videos from a http call
    this.loadVideos();
  }

  ngOnInit() {
  }

  deleteVideo(videoId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed()
      .pipe(first())
      .subscribe(response => {

        if(response.result) {
          this.isLoading = true;
          this.videoService.removeVideo(videoId)
            .pipe(first())
            .subscribe(() => {
              this.loadVideos();
            });
        }
    });
  }

  private loadVideos() {
    this.isLoading = true;
    this.videoService.getVideos()
      .pipe(first())
      .subscribe(videos => {
        this.isLoading = false;
        this.videos = videos;
      },
      error => this.handleError(error))
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    this.messageError = `Status code: ${error.status} - message: ${error.message}`;
    this.isLoading = false;
  }

}
