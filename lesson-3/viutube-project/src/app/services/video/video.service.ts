import { Injectable } from '@angular/core';
import Video from '../../models/video';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private baseUrl = 'http://demo7376228.mockable.io/api';
  
  constructor(private http: HttpClient) { }

  addVideo(video: Video) {
    // this.videos.push(video);
  }

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.baseUrl}/videos`);
  }
}
