import { Injectable } from '@angular/core';
import Video from '../../models/video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  videos: Video[] = [
    { name: 'Test video 1', imageUrl: 'https://i.ytimg.com/vi/FiVw6zjgw24/hqdefault.jpg', videoUrl: 'https://www.youtube.com/watch?v=FiVw6zjgw24', description: 'Test Description'},
    { name: 'Test video 1', imageUrl: 'https://i.ytimg.com/vi/FiVw6zjgw24/hqdefault.jpg', videoUrl: 'https://www.youtube.com/watch?v=FiVw6zjgw24', description: 'Test Description'},
    { name: 'Test video 1', imageUrl: 'https://i.ytimg.com/vi/FiVw6zjgw24/hqdefault.jpg', videoUrl: 'https://www.youtube.com/watch?v=FiVw6zjgw24', description: 'Test Description'},
    { name: 'Test video 1', imageUrl: 'https://i.ytimg.com/vi/FiVw6zjgw24/hqdefault.jpg', videoUrl: 'https://www.youtube.com/watch?v=FiVw6zjgw24', description: 'Test Description'},
    { name: 'Test video 1', imageUrl: 'https://i.ytimg.com/vi/FiVw6zjgw24/hqdefault.jpg', videoUrl: 'https://www.youtube.com/watch?v=FiVw6zjgw24', description: 'Test Description'},
    { name: 'Test video 1', imageUrl: 'https://i.ytimg.com/vi/FiVw6zjgw24/hqdefault.jpg', videoUrl: 'https://www.youtube.com/watch?v=FiVw6zjgw24', description: 'Test Description'},
    { name: 'Test video 1', imageUrl: 'https://i.ytimg.com/vi/FiVw6zjgw24/hqdefault.jpg', videoUrl: 'https://www.youtube.com/watch?v=FiVw6zjgw24', description: 'Test Description'},
    { name: 'Test video 1', imageUrl: 'https://i.ytimg.com/vi/FiVw6zjgw24/hqdefault.jpg', videoUrl: 'https://www.youtube.com/watch?v=FiVw6zjgw24', description: 'Test Description'},
    { name: 'Test video 1', imageUrl: 'https://i.ytimg.com/vi/FiVw6zjgw24/hqdefault.jpg', videoUrl: 'https://www.youtube.com/watch?v=FiVw6zjgw24', description: 'Test Description'},
  ];
  
  constructor() { }

  addVideo(video: Video) {
    this.videos.push(video);
  }
}
