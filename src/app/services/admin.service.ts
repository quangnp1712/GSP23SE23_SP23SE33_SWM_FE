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
export class AdminService {

  private REST_API_SERVER = 'http://localhost:8081';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) {}
  private handleError(error: HttpErrorResponse) {
    return throwError(error.error['message']);
  }

  // 1 PUT
  // /api/admin/homestay-activate
 public activeHomestay(name:string){
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json ',
      'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
    }),
  };
  const url =
      `${this.REST_API_SERVER}/api/admin/homestay-activate?homestayStyle=HOMESTAY&name=${name}`;
    return this.httpClient
      .put<any>(url, 'accept', this.httpOptions)
      .pipe(catchError(this.handleError));
  }

 public activeBlocHomestay(name:string){
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json ',
      'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
    }),
  };
  const url =
      `${this.REST_API_SERVER}/api/admin/homestay-activate?homestayStyle=BLOC&name=${name}`;
    return this.httpClient
      .put<any>(url, 'accept', this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 2 PUT
  // /api/admin/homestay-reject
  public rejectHomestay(name: string) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url =
      `${this.REST_API_SERVER}/api/admin/homestay-reject?homestayStyle=HOMESTAY&name=${name}`;
    return this.httpClient
      .put<any>(url, 'false', this.httpOptions)
      .pipe(catchError(this.handleError));
 }

  public rejectBlocHomestay(name: string) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url =
      `${this.REST_API_SERVER}/api/admin/homestay-reject?homestayStyle=BLOC&name=${name}`;
    return this.httpClient
      .put<any>(url, 'false', this.httpOptions)
      .pipe(catchError(this.handleError));
 }

  //  3 PUT
  // /api/admin/landlord-activate
  public activateLandlordAccount(name:string){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url =
      `${this.REST_API_SERVER}/api/admin/landlord-activate?username=${name}`;
    return this.httpClient
      .put<any>(url, 'false', this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 4 GET
  // /api/admin/landlord-list
  public getLandlordListFilterByStatus(status:string){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url =
      `${this.REST_API_SERVER}/api/admin/landlord-list?isNextPage=true&isPreviousPage=true&page=0&size=1000&status=${status}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 5 PUT
  //  /api/admin/landlord-reject
  public rejectLandlordAccount(name:string, reason:string){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url =
    `${this.REST_API_SERVER}/api/admin/landlord-reject?reason=${reason}&username=${name}`;
  return this.httpClient
    .put<any>(url, 'false', this.httpOptions)
    .pipe(catchError(this.handleError));
  }
}
