import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Post } from '../../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private url = `${environment.apiBaseUrl}/posts`;

  constructor(private http: HttpClient) { }

  getPosts(filter?: Partial<Post>): Observable<Post[]> {
    return this.http.get<Post[]>(this.url, {headers: this.headers, params: filter});
  }

  getPostsResponse(): Observable<HttpResponse<Post[]>> {
    return this.http.get<Post[]>(this.url, {headers: this.headers, observe: 'response'});
  }

  addPost(post: Omit<Post, 'id'>): Observable<Post> {
    return this.http.post<Post>(this.url, post, {headers: this.headers});
  }

  updatePost(id: number, post: Omit<Post, 'id'>): Observable<Post> {
    return this.http.put<Post>(`${this.url}/${id}`, post, {headers: this.headers});
  }

  patchPost(id: number, post: Partial<Omit<Post, 'id'>>): Observable<Post> {
    return this.http.patch<Post>(`${this.url}/${id}`, post, {headers: this.headers});
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.url}/${id}`, {headers: this.headers});
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
}
