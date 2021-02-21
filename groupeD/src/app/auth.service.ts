import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
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

  authenticateUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Contet-Type', 'application/json');
    console.log(headers);

    return this.http.get<any>('http://localhost:3000/user/login').pipe(map((res: HttpResponse<JSON>) => res));
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