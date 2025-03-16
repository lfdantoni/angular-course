import { Component, OnDestroy } from '@angular/core';
import { PostsService } from '../services/posts/posts.service';
import { AsyncPipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../models/post';
import { PostComponent } from './post/post.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { KebabCasePipe } from '../pipes/kebabcase.pipe';

@Component({
  selector: 'app-post-list',
  // imports: [AsyncPipe, PostComponent, RouterModule, KebabCasePipe],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
  standalone: false,
})
export class PostListComponent implements OnDestroy {
  posts$?: Observable<Post[]>;
  getPostsSubscription?: Subscription;

  constructor(
    public postsService: PostsService,
    private activateRoute: ActivatedRoute
  ) {
    // this.posts$ = this.postsService.getPosts(this.activateRoute.snapshot.queryParams);
    // this.posts$ = this.postsService.getPosts({ userId: 99 }); // empty array

    this.activateRoute.queryParams.subscribe({
      next: (queryParams) => {
        console.log('queryparams changed', queryParams);
        this.posts$ = this.postsService.getPosts(queryParams);
      },
    });

    this.getPostsSubscription = this.postsService.getPostsResponse().subscribe({
      next: (response) => {
        console.log(response);
      },
    });

    const addSubscription = this.postsService
      .addPost({ title: 'New Post', body: 'This is a new post', userId: 1 })
      .subscribe({
        next: (post) => {
          addSubscription.unsubscribe();
          console.log('added post', post);
        },
      });

    const updatedSubscription = this.postsService
      .updatePost(1, {
        title: 'Update Post',
        body: 'This is an updated post',
        userId: 1,
      })
      // .updatePost(101, { title: 'Update Post', body: 'This is an updated post', userId: 1 }) // this will throw an error
      .subscribe({
        next: (post) => {
          updatedSubscription.unsubscribe();
          console.log('updated post', post);
        },
        error: (error) => {
          updatedSubscription.unsubscribe();
          console.error('Error updating post', error);
        },
      });

    const patchSubscription = this.postsService
      .patchPost(1, { title: 'Patch Post' })
      .subscribe({
        next: (post) => {
          patchSubscription.unsubscribe();
          console.log('patched post', post);
        },
        error: (error) => {
          patchSubscription.unsubscribe();
          console.error('Error patching post', error);
        },
      });

    const deleteSubscription = this.postsService.deletePost(1).subscribe({
      next: (post) => {
        deleteSubscription.unsubscribe();
        console.log('deleted post', post);
      },
      error: (error) => {
        deleteSubscription.unsubscribe();
        console.error('Error deleting post', error);
      },
    });
  }

  ngOnDestroy() {
    console.log('PostListComponent destroyed');
    this.getPostsSubscription?.unsubscribe();
  }
}
