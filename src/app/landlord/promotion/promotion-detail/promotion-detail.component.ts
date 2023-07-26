import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/pop-up/message/message.component';
import { SuccessComponent } from 'src/app/pop-up/success/success.component';
import { ImageService } from 'src/app/services/image.service';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-promotion-detail',
  templateUrl: './promotion-detail.component.html',
  styleUrls: ['./promotion-detail.component.scss'],
})
export class PromotionDetailComponent implements OnInit{
  constructor(
    private http: PromotionService,
    private image: ImageService,
    public dialog: MatDialog
  ) {}
  id!:number;
  datas:any;
  message:any;
 ngOnInit(){
  this.id = sessionStorage.getItem('id') as unknown as number;
  console.log('id', this.id);
  this.getPromotionCampaignById();
 }
 getPromotionCampaignById(){
  try {
     this.http.getPromotionCampaignById(this.id).subscribe({
      next:async (data:any) => {
        if(data){
          console.log('data :', data);
          const value = data;
          this.datas={
            name: value.name,
            description: value.description,
            thumbnailUrl: value.thumbnailUrl,
            startDate:value.startDate,
            endDate:value.endDate,
            status:value.status,
            discountPercent:value.discountPercent,
            totalProfit:value.totalProfit,
            totalBooking:value.totalBooking,
            homestays:value.homestays,
            blocs:value.blocs
          };
          await this.image
                .getImage(('campaign/' + this.datas.thumbnailUrl) as string)
                .then((url) => {
                  let urls = url as string;
                  this.datas.thumbnailUrl = urls;
                });
        }
      },
      error: (error) => {
        this.message = error;
        this.openDialogMessage;
      },
     })
  } catch (error) {
    this.message = error as string;
    this.openDialogMessage();
    console.log(error);
  }
 }

 openDialogMessage() {
  this.dialog.open(MessageComponent, {
    data: this.message,
  });
}
openDialogSuccess() {
  this.dialog.open(SuccessComponent, {
    data: this.message,
  });
}
}
