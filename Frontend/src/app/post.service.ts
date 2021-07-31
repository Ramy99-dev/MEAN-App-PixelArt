import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from './entities/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _httpClient: HttpClient) { }


  uploadImg(img: any): Observable<any> {
    return this._httpClient.post('http://localhost:4500/upload-img', img);
  }
  addPost(post: Post): Observable<any> {

    return this._httpClient.post('http://localhost:4500/add-post', { 'post': post });
  }
  getAllPosts(p: number): Observable<any> {
    return this._httpClient.get(`http://localhost:4500/get-all-posts/page=${p}/limit=6`);
  }

  getPost(p: number): Observable<any> {

    return this._httpClient.get(`http://localhost:4500/get-post/page=${p}/limit=6`);
  }
  getPostByUserId(user_id: string): Observable<any> {

    return this._httpClient.get('http://localhost:4500/get-posts-by-user-id', {
      observe: 'body',
      params: new HttpParams().append('user_id', user_id)
    });
  }

  getBestPosts(): Observable<any> {
    return this._httpClient.get('http://localhost:4500/group-posts');
  }
  getPostById(id: string): Observable<any> {
    return this._httpClient.get('http://localhost:4500/get-post-id', { observe: 'body', params: { id: id } })
  }


  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();



  changeMessage(post: any) {

    this.messageSource.next(post)
  }


}
