import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Contet-Type', 'application/json');

    return this.http.post<any>('http://localhost:3000/user/register', user, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));
  }

  createGroup(groupName: any) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')

    return this.http.post<any>('http://localhost:3000/group/create', { groupName }, {
      headers: headers,
      withCredentials: true,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));
  }

  getUsernameWithoutCookie(_id: any) {
    console.log(_id)
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')

    return this.http.post<any>('http://localhost:3000/user/getUsernameWithoutCookie', { _id }, {
      headers: headers,
      withCredentials: true,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));
  }

  getGroup() {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')

    return this.http.post<any>('http://localhost:3000/group/getGroup', {
      headers: headers,
      withCredentials: true,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));
  }

  joinGroup(groupCode: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post<any>('http://localhost:3000/group/join', { groupCode }, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));
  }

  authenticateUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Contet-Type', 'application/json');

    return this.http.post<any>('http://localhost:3000/user/login', user, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));
  }

storeUserData(user: any, token: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    if (localStorage.id_token == undefined) {
      // console.log('Goodbye');
      return false
    } else {
      // console.log('Hello');
      const helper = new JwtHelperService()
      // console.log(!helper.isTokenExpired(localStorage.id_token));
      return !helper.isTokenExpired(localStorage.id_token);
    }
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}