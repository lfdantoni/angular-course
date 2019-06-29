import { Injectable } from '@angular/core';
import Video from '../../models/video';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable()
export class VideoService {
  private baseUrl = environment.apiUrl;
  private httpOptions: any;
  
  constructor(private http: HttpClient) { 
    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
  }

  addVideo(video: Video): Observable<HttpEvent<Video>> {
    return this.http.post<Video>(`${this.baseUrl}/videos`, video, this.httpOptions);
  }

  getVideoById(videoId: string): Observable<Video> {
    return this.http.get<Video>(`${this.baseUrl}/videos/${videoId}`);
  }

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.baseUrl}/videos`);
  }

  removeVideo(videoId: string): Observable<{}> {
    return this.http.delete(`${this.baseUrl}/videos/${videoId}`, this.httpOptions);
  }

  updateVideo(video: Video): Observable<HttpEvent<Video>> {
    return this.http.put<Video>(`${this.baseUrl}/videos`, video, this.httpOptions);
  }
}
