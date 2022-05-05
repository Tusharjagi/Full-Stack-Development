import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject } from 'rxjs';
import { baseURL } from '../Shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

interface AuthResponse {
  status: string;
  success: string;
  token: string;
}

interface JWTResponse{
  status: string;
  success: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenKey = 'JWT';
  isAuthenticated: Boolean = false;
  username: Subject<string> = new Subject<string>();
  authToken : undefined;

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  checkJWTtoken(){
    this.http.get<JWTResponse>(baseURL + 'users/checkJWTtoken')
    .subscribe(res => {
      console.log('JWT Token Valid : ', res);
      this.sendUsername(res.user.username);
    },
    err => {
      console.log('JWT Token invalid: ',err);
      this.destroyUserCredentials();
    });
  }

  sendUsername(name: '') {
    this.username.next(name);
  }

  clearUsername() {
    this.username.next('');
  }

  loadUserCredentials() {
    const credentials = JSON.parse(localStorage.getItem(this.tokenKey)|| '{}');
    console.log('loadUserCredentials ', credentials);
    if (credentials && credentials.username !== undefined) {
      this.useCredentials(credentials);
      if (this.authToken) {
       this.checkJWTtoken();
      }
    }
  }
  storeUserCredentials(credentials: any) {
    console.log('storeUserCredentials ', credentials);
    localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
    this.useCredentials(credentials);
  }

  useCredentials(credentials: any) {
    this.isAuthenticated = true;
    this.sendUsername(credentials.username);
    this.authToken = credentials.token;
  }

  destroyUserCredentials() {
    this.authToken = undefined;
    this.clearUsername();
    this.isAuthenticated = false;
    localStorage.removeItem(this.tokenKey);
  }

  signUp() {}

  logIn(user: any): Observable<any> {
    return this.http.post<AuthResponse>(baseURL + 'users/login',
      {'username': user.username, 'password': user.password})
      .pipe( map(res => {
          this.storeUserCredentials({username: user.username, token: res.token});
          return {'success': true, 'username': user.username };
      }),
       catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  logOut() {
    this.destroyUserCredentials();
  }

  isLoggedIn(): Boolean {
    return this.isAuthenticated;
  }

  getUsername(): Observable<string> {
    return this.username.asObservable();
  }

  getToken(){
    return this.authToken;
  }
}

