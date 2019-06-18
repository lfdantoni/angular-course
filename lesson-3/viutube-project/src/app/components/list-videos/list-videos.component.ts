import { Component, OnInit } from '@angular/core';
import Video from '../../models/video';

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.css']
})
export class ListVideosComponent implements OnInit {
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

  ngOnInit() {
  }

}
