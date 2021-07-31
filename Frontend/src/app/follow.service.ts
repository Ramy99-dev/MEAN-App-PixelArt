import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private _httpClient: HttpClient) { }

  addFollow(id: string): Observable<any> {

    return this._httpClient.post('http://localhost:4500/add-follow', { user_id: id })
  }
  getFollow(id: string): Observable<any> {
    return this._httpClient.get('http://localhost:4500/get-follow', {
      observe: 'body',
      params: {
        user_id: id
      }
    })
  }
  getUserFollow(id: string): Observable<any> {
    return this._httpClient.get('http://localhost:4500/get-user-follow', {
      observe: 'body',
      params: {
        user_id: id
      }
    })
  }

  deleteFollow(id: string): Observable<any> {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { follow_id: id }
    };
    return this._httpClient.delete('http://localhost:4500/delete-follow', options)
  }
}
