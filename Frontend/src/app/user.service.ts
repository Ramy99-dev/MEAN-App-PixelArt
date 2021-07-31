import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './entities/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) { }
  addUser(user: User): Observable<any> {
    return this._httpClient.post('http://localhost:4500/add-user', user);
  }

  getUser(user: any): Observable<any> {
    return this._httpClient.post('http://localhost:4500/login', user);
  }
  getUserById(id: string): Observable<any> {
    return this._httpClient.get('http://localhost:4500/get-user-id', { observe: 'body', params: { id: id } })
  }
  getProfile(): Observable<any> {

    return this._httpClient.get('http://localhost:4500/profile');
  }
  changeImg(img: any): Observable<any> {


    return this._httpClient.post('http://localhost:4500/upload-profile-img', img);
  }

  updateProfileImg(img: string): Observable<any> {
    return this._httpClient.put('http://localhost:4500/update-profile-img', { 'img': img });
  }
}
