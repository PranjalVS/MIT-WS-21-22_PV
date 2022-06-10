import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { environment } from '../environments/environment';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  // URL of the server
  apiUrl = environment.SOCKET_ENDPOINT;
  redirectUrl: string;

  constructor(private httpClient: HttpClient) { }

  loginU(userData: User) {
    console.log(userData.email + ";" + userData.password);
    //localStorage.setItem('access_token', userData.email + ";" + userData.password); 
    console.log(`${this.apiUrl}/users/${userData.username}/${userData.email}/${userData.usertype}/${userData.password}`) ;
    return this.httpClient.get<User>(`${this.apiUrl}/users/${userData.username}/${userData.email}/${userData.usertype}`) ;
  }

  register(userData: User) {
    let un = userData.username;
    let em = userData.email;
    let pw = userData.password;
    let ut = userData.usertype;
    console.log("jwt.service register email: " + em);
    console.log("jwt.service register password: " + pw);
    return this.httpClient.post<User>(`${this.apiUrl}/users`, { username: un, email: em, usertype: ut, password: pw })
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        console.log("post register response: " + res.token);

      });
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }


  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

}
