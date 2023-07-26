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
export class PromotionService {


  private REST_API_SERVER = 'http://localhost:8081';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) {}
  private handleError(error: HttpErrorResponse) {
    return throwError(error.error['message']);
  }

  // GET
  // /api/campaign  getPromotionCampaignById
  public getPromotionCampaignById(id:number){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url =
      `${this.REST_API_SERVER}/api/campaign?campaignId=${id}`;
    return this.httpClient
      .get<any>(url,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // POST
  // /api/campaign createPromotionCampaign
  public createPromotionCampaign(body:any){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url =`${this.REST_API_SERVER}/api/campaign`;
    return this.httpClient
      .post<any>(url,body, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // GET
  // /api/campaign/list  getPromotionCampaignListByStatus
  public getPromotionCampaignListByStatus(status:string){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url =
      `${this.REST_API_SERVER}/api/campaign/list?isNextPage=true&isPreviousPage=true&page=1&size=1000&status=${status}`;
    return this.httpClient
      .get<any>(url,this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
