import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
})
export class DashboardAdminComponent implements OnInit {
  dashboardData: Response = {
    totalProfit: 0,
    totalLandlord: 0,
    totalPassenger: 0,
    landlordTable: [
      {
        imageUrl: '',
        name: '',
        commission: 0,
        activatingHomestays: 0,
        activatingBlocHomestays: 0,
        createdDate: '',
      },
    ],
    passengerTable: [
      {
        imageUrl: '',
        name: '',
        balance: 0,
        totalBooking: 0,
      },
    ],
  };

  constructor(private http: DashboardService) {}

  ngOnInit(): void {
    this.getDashboardData();
  }
  getDashboardData() {
    this.http.getDashboardAdmin().subscribe((data) => {
      this.dashboardData = data;
      for(let img of this.dashboardData.landlordTable){
        if(!img.imageUrl){
          this.dashboardData.landlordTable[this.dashboardData.landlordTable.indexOf(img)].imageUrl = 'https://firebasestorage.googleapis.com/v0/b/stay-with-me-356017.appspot.com/o/landlord%2Favatar%2Fdefault.png?alt=media&token=d62361f3-6391-44f5-80a7-b22bda704b04';
        }
      }
      for(let img of this.dashboardData.passengerTable){
        if(!img.imageUrl){
          this.dashboardData.passengerTable[this.dashboardData.passengerTable.indexOf(img)].imageUrl = 'https://firebasestorage.googleapis.com/v0/b/stay-with-me-356017.appspot.com/o/landlord%2Favatar%2Fdefault.png?alt=media&token=d62361f3-6391-44f5-80a7-b22bda704b04';
        }
      }
      console.log(data);
    });
  }
  // Landlord
  pageLandlord: number = 1;
  countLandlord: number = 0;
  tableSizeLandlord: number = 10;

  // Landlord
  onTableDataChangeLandlord(event: any) {
    this.pageLandlord = event;
    this.dashboardData.landlordTable;
  }

  // Passenger
  pagePassenger: number = 1;
  countPassenger: number = 0;
  tableSizePassenger: number = 10;

  // Bloc
  onTableDataChangePassenger(event: any) {
    this.pagePassenger = event;
    this.dashboardData.passengerTable;
  }

  public onItemSelector(name: string) {
    sessionStorage.setItem('name', name);
    localStorage.setItem('createdBy', name);
  }
}
export interface Response {
  totalProfit: number;
  totalLandlord: number;
  totalPassenger: number;
  landlordTable: {
    imageUrl: string;
    name: string;
    commission: number;
    activatingHomestays: number;
    activatingBlocHomestays: number;
    createdDate: string;
  }[];
  passengerTable: {
    imageUrl: string;
    name: string;
    balance: number;
    totalBooking: number;
  }[];
}
