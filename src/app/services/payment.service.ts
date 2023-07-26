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
export class PaymentService {

  private REST_API_SERVER = 'http://localhost:8081';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) {}
  private handleError(error: HttpErrorResponse) {
    return throwError(error.error['message']);
  }

  // 1 PUT
  // /api/payment passengerPayment
 public passengerPayment(amount:number){
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json ',
      'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
    }),
  };
  const url =
      `${this.REST_API_SERVER}/api/payment?amount=${amount}&walletType=LANDLORD_WALLET`;
    return this.httpClient
      .put<any>(url,null, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
