import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ImageService } from 'src/app/services/image.service';
@Component({
  selector: 'app-dashboard-landlord',
  templateUrl: './dashboard-landlord.component.html',
  styleUrls: ['./dashboard-landlord.component.scss'],
})
export class DashboardLandlordComponent implements OnInit {
  dashboardData: Response = {
    totalProfit: 0,
    totalPromotion: 0,
    totalCommission: 0,
    homestayTable: [
      {
        imgUrl: '123 pass-sign-or-stamp-vector-22523712 - Copy.jpg',
        name: '123',
        profit: 0,
        totalBooking: 0,
      },
    ],
    blocTable: [
      {
        imgUrl: '1233 pass-sign-or-stamp-vector-22523712 - Copy.jpg',
        name: 'quan 9',
        profit: 0,
        totalBooking: 0,
      },
    ],
  };

  constructor(private http: DashboardService, private image: ImageService) {}

  ngOnInit(): void {
    this.getDashboardData();
  }
  getDashboardData() {
    this.http.getDashboardLandlord().subscribe(async (data) => {
      this.dashboardData = data;
      for(let img of this.dashboardData.blocTable){
        await this.image
              .getImage(('homestay/' + img.imgUrl) as string)
              .then((url) => {
                let urls = url as string;
                this.dashboardData.blocTable[this.dashboardData.blocTable.indexOf(img)].imgUrl = urls;
              });
      }
      for(let img of this.dashboardData.homestayTable){
        await this.image
              .getImage(('homestay/' + img.imgUrl) as string)
              .then((url) => {
                let urls = url as string;
                this.dashboardData.homestayTable[this.dashboardData.homestayTable.indexOf(img)].imgUrl = urls;
              });
      }
      console.log(data);
    });
  }
  // Homestay
  pageHomestay: number = 1;
  countHomestay: number = 0;
  tableSizeHomestay: number = 10;

  // Homestay
  onTableDataChangeHomestay(event: any) {
    this.pageHomestay = event;
    this.dashboardData.homestayTable;
  }

  // Bloc
  pageBloc: number = 1;
  countBloc: number = 0;
  tableSizeBloc: number = 10;

  // Bloc
  onTableDataChangeBloc(event: any) {
    this.pageBloc = event;
    this.dashboardData.blocTable;
  }
  public onItemSelector(name: string) {
    sessionStorage.setItem('name', name);

  }

}
export interface Response {
  totalProfit: number;
  totalPromotion: number;
  totalCommission: number;
  homestayTable: {
    imgUrl: string;
    name: string;
    profit: number;
    totalBooking: number;
  }[];
  blocTable: {
    imgUrl: string;
    name: string;
    profit: number;
    totalBooking: number;
  }[];
}
