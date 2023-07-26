import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BlocHomestay } from 'src/app/models/bloc-homestay.model';
import { MessageComponent } from 'src/app/pop-up/message/message.component';
import { PendingHomestayComponent } from 'src/app/pop-up/pending-homestay/pending-homestay.component';
import { SuccessComponent } from 'src/app/pop-up/success/success.component';
import { AdminService } from 'src/app/services/admin.service';
import { HomestayService } from 'src/app/services/homestay.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-bloc-homestay-detail',
  templateUrl: './bloc-homestay-detail.component.html',
  styleUrls: ['./bloc-homestay-detail.component.scss']
})
export class BlocHomestayDetailComponent {
  constructor(
    private http: HomestayService,
    private image: ImageService,
    public dialog: MatDialog,
    private httpAdmin:AdminService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    let role = localStorage.getItem('role');
    if(role == "LANDLORD" && this.router.url.includes('/Admin')){
      this.router.navigate(['/Landlord/Dashboard'], {
        relativeTo: this.route,});
    } else if(role == "ADMIN"){
         this.name = sessionStorage.getItem('name') as string;
    this.getHomestay();
    }

  }
  id:any;
  name!: string;
  message!: string;
  datas!: BlocHomestay;
  url!: any;
  urls: string[] = [];
  urls4: string[] = [];
  priceTax!: number;
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
  getHomestay() {
    try {
      this.http.getBlocHomestayDetailByName(this.name).subscribe({
        next: async (data:any) =>{
          if(data){
            const value = data;
            this.urls = [];
            this.urls4 = [];
            console.log('data' , data);
            this.id=value.id;
            this.datas = {
              id:value.id,
              name:value.name,
              address:value.address,
              businessLicense:value.businessLicense,
              status:value.status,
              totalAverageRating:value.totalAverageRating,
              homestayServices:value.homestayServices,
              homestays:value.homestays,
              homestayRules:value.homestayRules,
              ratings:value.ratings,
              isPendingBooking: value.isPendingBooking,
            }
            if(this.datas.status != "ACTIVATING" && this.datas.status != "PENDING" ){
              this.datas.status = 'REJECTED';

            }

            console.log('status' , this.datas.status);
            console.log('datas' , this.datas);
            for(let homestay of this.datas.homestays){
              for(let url of homestay.homestayImages){
                await this.image
                .getImage(('homestay/' + url.imageUrl) as string)
                .then((url) => {
                  let urls = url as string;
                  this.urls.push(urls);
                });
              }

            }
            for (let i = 3; i < this.urls.length && i <= 6; i++) {
              this.urls4.push(this.urls[i]);
            }
            await this.image
              .getImage(('license/' + this.datas.businessLicense) as string)
              .then((url) => {
                let urls = url as string;
                this.datas.businessLicense = urls;
              });
            for(let i =0 ; i<this.datas.homestays.length ; i++){
              var priceToFixed = (this.datas.homestays[i].price * 0.95).toFixed();
              this.datas.homestays[i].id  = priceToFixed as unknown as number;
            }

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
  public accept() {
    console.log('Accept');
    this.httpAdmin.activeBlocHomestay(this.name).subscribe(
      (data) => {
        if (data != null) {
          this.message = 'Bloc Homestay have accept';
          this.openDialogSuccess();
          this.getHomestay();
        }
        console.log(data);
      },
      (error) => {
          this.message = error;
          this.openDialogMessage();

      }
    );
  }
  openDialogAction() {
    localStorage.setItem('blocHomestay', 'true');
    const dialogRef = this.dialog.open(PendingHomestayComponent, {
      data: {
        id: this.id,
        name: this.name,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(()=>{
      setTimeout(() =>{
        this.getHomestay();
      } , 4000)
    })
  }
}
