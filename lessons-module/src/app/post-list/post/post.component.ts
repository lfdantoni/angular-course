import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Post } from '../../models/post';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-post',
  // imports: [
  //   MatCardModule,
  //   MatChipsModule,
  //   MatIconModule,
  //   SlicePipe,
  // ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  standalone: false,
})
export class PostComponent {
  @Input() post!: Post;
}
