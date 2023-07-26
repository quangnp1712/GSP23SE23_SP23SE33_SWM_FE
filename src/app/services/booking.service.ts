import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private REST_API_SERVER = 'http://localhost:8081';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) {}
  private handleError(error: HttpErrorResponse) {
    return throwError(error.error['message']);
  }

  //  GET
  //  /api/booking/landlord/bloc/booking-list
  public getBookingBlocForLandlord(name: string , status:string): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url = `${this.REST_API_SERVER}/api/booking/landlord/bloc/booking-list?blocName=${name}&status=${status}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //  GET
  //  /api/booking/landlord/booking-list
  public getBookingForLandlord(name: string , status:string): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url = `${this.REST_API_SERVER}/api/booking/landlord/homestay/booking-list?homestayName=${name}&status=${status}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // PUT
  // /api/booking/accept  acceptBookingForHomestay
  public acceptBookingForHomestay(
    bookingId: number,
    homestayId: number
  ): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url = `${this.REST_API_SERVER}/api/booking/homestay/accept?bookingId=${bookingId}&homestayId=${homestayId}`;
    return this.httpClient
      .put<any>(url,null,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // PUT
  // /api/booking/reject rejectBookingForHomestay
  public rejectBookingForHomestay(
    bookingId: number,
    homestayId: number,
    message:string
  ): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const value = {message:message};
    const url = `${this.REST_API_SERVER}/api/booking/homestay/reject?bookingId=${bookingId}&homestayId=${homestayId}`;
    return this.httpClient
      .put<any>(url, value, this.httpOptions)
      .pipe(catchError(this.handleError));
  }




  // PUT
  // /api/booking/bloc/accept  acceptBookingForBloc
  public acceptBookingForBloc(
    bookingId: number,
    homestayId: number
  ): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url = `${this.REST_API_SERVER}/api/booking/bloc/accept?bookingId=${bookingId}`;
    return this.httpClient
      .put<any>(url,null,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // PUT
  // /api/booking/reject rejectBookingForBloc
  public rejectBookingForBloc(
    bookingId: number,
    homestayId: number,
    message:string
  ): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const value = {message:message};
    const url = `${this.REST_API_SERVER}/api/booking/bloc/reject?bookingId=${bookingId}`;
    return this.httpClient
      .put<any>(url, value, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //  GET
  //  /api/booking/code
  public getLandlordBooking(code: string ): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url = `${this.REST_API_SERVER}/api/booking/code?bookingCode=${code}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }


  // PUT
  // /api/booking/bloc/check-in checkInForBloc
  public checkInForBloc(bookingId: number ): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url = `${this.REST_API_SERVER}/api/booking/bloc/check-in?bookingId=${bookingId}`;
    return this.httpClient
      .put<any>(url,null,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // PUT
  // /api/booking/bloc/check-out checkOutForBloc
  public checkOutForBloc(bookingId: number ): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url = `${this.REST_API_SERVER}/api/booking/bloc/check-out?bookingId=${bookingId}`;
    return this.httpClient
      .put<any>(url,null,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // PUT
  // /api/booking/homestay/check-in checkInForHomestay
  public checkInForHomestay(bookingId: number, homestayId:number ): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url = `${this.REST_API_SERVER}/api/booking/homestay/check-in?bookingId=${bookingId}&homestayId=${homestayId}`;
    return this.httpClient
      .put<any>(url,null,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // PUT
  // /api/booking/homestay/check-out checkOutForHomestay
  public checkOutForHomestay(bookingId: number, homestayId:number ): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url = `${this.REST_API_SERVER}/api/booking/homestay/check-out?bookingId=${bookingId}&homestayId=${homestayId}`;
    return this.httpClient
      .put<any>(url,null,this.httpOptions)
      .pipe(catchError(this.handleError));
  }



}
