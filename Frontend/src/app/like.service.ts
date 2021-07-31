import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private _httpClient: HttpClient) { }

  addLike(id: string): Observable<any> {

    return this._httpClient.post('http://localhost:4500/add-like', { post_id: id })
  }
  getUserLike(id: string): Observable<any> {
    return this._httpClient.get('http://localhost:4500/get-user-like', {
      observe: 'body',
      params: {
        post_id: id
      }
    })
  }

  deleteLike(id: string): Observable<any> {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { like_id: id }
    };

    return this._httpClient.delete('http://localhost:4500/delete-like', options)

  }

  getPostLikes(id: string): Observable<any> {


    return this._httpClient.get('http://localhost:4500/post-like', {
      observe: 'body',
      params: {
        post_id: id
      }
    })
  }
}
