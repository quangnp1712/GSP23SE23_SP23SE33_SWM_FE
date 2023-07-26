import { Component, OnInit } from '@angular/core';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-promotion-overview',
  templateUrl: './promotion-overview.component.html',
  styleUrls: ['./promotion-overview.component.scss']
})
export class PromotionOverviewComponent implements OnInit{
constructor(
  private http: PromotionService
){}
ngOnInit(): void {
this.getPromotionProgressing();
this.getPromotionProgressed();
this.getPromotionPending();
}

id:any;
username:any;
totalProfit=0;
totalBooking=0;
// valuesProgress
pageProgress: number = 1;
countProgress: number = 0;
tableSizeProgress: number = 5;

onTableDataChangeProgress(event: any) {
  this.pageProgress = event;
  this.valuesProgress;
}

public onItemSelector(id: number, createdBy: string) {
  this.id = id;
  this.username = createdBy;
  sessionStorage.setItem('id', id + '');
  sessionStorage.setItem('name' ,createdBy );
}
// valuesProgressed
pageProgressed: number = 1;
countProgressed: number = 0;
tableSizeProgressed: number = 5;

onTableDataChangeProgressed(event: any) {
  this.pageProgressed = event;
  this.valuesProgressed;
}


// valuesPending
pagePending: number = 1;
countPending: number = 0;
tableSizePending: number = 5;

onTableDataChangePending(event: any) {
  this.pagePending = event;
  this.valuesPending;
}


// Progress
valuesProgress: any[] = [];
getPromotionProgressing() {
  this.valuesProgress = [];
  this.http.getPromotionCampaignListByStatus('PROGRESSING').subscribe(async (data) => {
    console.log(data);
    for (let i of data['campaignList'].reverse()) {
      this.valuesProgress.push({
        id:i.id,
        name:i.name,
        startDate:i.startDate,
        endDate:i.endDate,
        totalProfit:i.totalProfit,
        totalBooking:i.totalBooking,
        discountPercentage:i.discountPercent
      });
      this.totalBooking += i.totalBooking;
      this.totalProfit += i.totalProfit;
    };
    console.log(this.valuesProgress);
  });
}

// Pending
valuesPending: any[] = [];
getPromotionPending() {
  this.valuesPending = [];
  this.http.getPromotionCampaignListByStatus('PENDING').subscribe(async (data) => {
    for (let i of data['campaignList'].reverse()) {
      this.valuesPending.push({
        id:i.id,
        name:i.name,
        startDate:i.startDate,
        endDate:i.endDate,
        totalProfit:i.totalProfit,
        totalBooking:i.totalBooking,
        discountPercentage:i.discountPercent
      });
    }
  });
}

// Progressed
valuesProgressed: any[] = [];
getPromotionProgressed() {
  this.valuesProgressed = [];
  this.http.getPromotionCampaignListByStatus('FINISHED').subscribe(async (data) => {
    for (let i of data['campaignList'].reverse()) {
      this.valuesProgressed.push({
        id:i.id,
        name:i.name,
        startDate:i.startDate,
        endDate:i.endDate,
        totalProfit:i.totalProfit,
        totalBooking:i.totalBooking,
        discountPercentage:i.discountPercent
      });
      this.totalBooking += i.totalBooking;
      this.totalProfit += i.totalProfit;
    }
  });
}
}
