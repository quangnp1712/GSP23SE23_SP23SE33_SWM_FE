import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private REST_API_SERVER = 'http://localhost:8081';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) {}
  private handleError(error: HttpErrorResponse) {
    return throwError(error.error['message']);
  }

  // 1 GET
  // /api/user/info  GetUserInfo
  public getUserInfo(username:string){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url =
        `${this.REST_API_SERVER}/api/user/info?username=${username}`;
      return this.httpClient
        .get<any>(url, this.httpOptions)
        .pipe(catchError(this.handleError));
  }

  // 2 POST
  // /api/user/login
  public login(username:string , password:string){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        // 'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const value = {password,username};
    const url =
        `${this.REST_API_SERVER}/api/user/login`;
      return this.httpClient
        .post<any>(url,value,this.httpOptions)
        .pipe(catchError(this.handleError));
   }

  //  3 POST
  // /api/user/registration-landlord
  public  registerLandlordAccount(
    address: string,
    dob: string,
    email: string,
    gender: string,
    idCardNumber: string,
    password: string,
    phone: string,
    username: string,
    back: string,
    front: string
  ) {
    console.log('convert service ' , dob);
    let avatarUrl = '';
    var value = {
      address,
      avatarUrl,
      dob,
      email,
      gender,
      idCardNumber,
      password,
      phone,
      username,
    };
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        // 'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url = `${this.REST_API_SERVER}/api/user/registration-landlord?back=${back}&front=${front}`;
    return this.httpClient
      .post<any>(url, value, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  setToken(token: string){
    localStorage.setItem('token',token);
  }
  // 1 GET
  // /api/user/commissions getCommissionList
  public getCommissionList(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url =
        `${this.REST_API_SERVER}/api/user/commissions`;
      return this.httpClient
        .get<any>(url, this.httpOptions)
        .pipe(catchError(this.handleError));
  }
}
