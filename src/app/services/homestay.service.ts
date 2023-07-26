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
export class HomestayService {

  private REST_API_SERVER = 'http://localhost:8081';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) {}
  private handleError(error: HttpErrorResponse) {
    return throwError(error.error['message']);
  }


  // 1 GET LANDLORD
  //  /api/homestay/homestay-list
  public getHomestayByLandlord(status: string):Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url = `${this.REST_API_SERVER}/api/homestay/homestay-list?isNextPage=true&isPreviousPage=true&page=0&param=${status}&size=1000`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //  GET ADMIN
  // /api/homestay/user/homestay-list
  public getHomestayByStatus(status: any):Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url = `${this.REST_API_SERVER}/api/homestay/user/homestay-list?isNextPage=true&isPreviousPage=true&page=0&size=1000&status=${status}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //  GET ADMIN
  // /api/homestay/user/bloc-list
  public  findBlocList(status: any):Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url = `${this.REST_API_SERVER}/api/homestay/user/bloc-list?isNextPage=true&isPreviousPage=true&page=0&size=1000&status=${status}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

   // GET LANDLORD
  // /api/homestay/bloc-list
public getBlocByLandlord(status:string):Observable<any>{
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json ',
      'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
    }),
  };
  const url = `${this.REST_API_SERVER}/api/homestay/bloc-list?isNextPage=true&isPreviousPage=true&page=0&param=${status}&size=1000`;
  return this.httpClient
    .get<any>(url, this.httpOptions)
    .pipe(catchError(this.handleError));
}



  // 2 POST
  // /api/homestay/new-bloc  createBloc
  public createBloc(data:any){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url = `${this.REST_API_SERVER}/api/homestay/new-bloc`;
  return this.httpClient
    .post<any>(url, data, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  // 3 POST
  // /api/homestay/new-homestay
  public createHomestay(
    name: string,
    address: string,
    availableRooms: string,
    businessLicense: string,
    homestayImages: Array<any>,
    homestayServices: Array<any>,
    homestayFacilities: Array<any>,
    price: string,
    roomCapacity:number,
    homestayRules: Array<any>
  ) {
    var value = {
      address,
      availableRooms,
      businessLicense,
      homestayFacilities,
      homestayImages,
      homestayRules,
      homestayServices,
      name,
      price,
      roomCapacity
    };
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      })
    }
    console.log(value);
    const url = `${this.REST_API_SERVER}/api/homestay/new-homestay`;
    return this.httpClient
      .post<any>(url, value, httpOptions)
      .pipe(catchError(this.handleError));
  }



// 5 GET
//  /api/homestay/user/homestay-detail
public getHomestayDetailByName(name:string):Observable<any>{
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json ',
      'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
    }),
  };
  const url = `${this.REST_API_SERVER}/api/homestay/user/homestay-detail?name=${name}`;
  return this.httpClient
    .get<any>(url, this.httpOptions)
    .pipe(catchError(this.handleError));
}
// 6 GET
//  /api/homestay/user/bloc-detail
public getBlocHomestayDetailByName(name:string):Observable<any>{
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json ',
      'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
    }),
  };
  const url = `${this.REST_API_SERVER}/api/homestay/user/bloc-detail?name=${name}`;
  return this.httpClient
    .get<any>(url, this.httpOptions)
    .pipe(catchError(this.handleError));
}


}
