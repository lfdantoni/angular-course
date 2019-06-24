import { Injectable } from '@angular/core';
import Video from '../../models/video';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private baseUrl = 'http://demo7376228.mockable.io/api';
  private httpOptions: any;
  
  constructor(private http: HttpClient) { 
    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
  }

  addVideo(video: Video): Observable<HttpEvent<Video>> {
    return this.http.post<Video>(`${this.baseUrl}/video`, video, this.httpOptions);
  }

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.baseUrl}/videos`);
  }

  removeVideo(videoId: string): Observable<{}> {
    return this.http.delete(`${this.baseUrl}/video/${videoId}`, this.httpOptions);
  }

  updateVideo(video: Video): Observable<HttpEvent<Video>> {
    return this.http.put<Video>(`${this.baseUrl}/video`, video, this.httpOptions);
  }
}
