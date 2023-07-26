import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Homestay } from 'src/app/models/homestay.model';
import { ActionPendingComponent } from 'src/app/pop-up/action-pending/action-pending.component';
import { BookingPendingComponent } from 'src/app/pop-up/booking-pending/booking-pending.component';

import { MessageComponent } from 'src/app/pop-up/message/message.component';
import { PendingHomestayComponent } from 'src/app/pop-up/pending-homestay/pending-homestay.component';
import { SuccessComponent } from 'src/app/pop-up/success/success.component';
import { AdminService } from 'src/app/services/admin.service';
import { BookingService } from 'src/app/services/booking.service';
import { HomestayService } from 'src/app/services/homestay.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-homestay-detail',
  templateUrl: './homestay-detail.component.html',
  styleUrls: ['./homestay-detail.component.scss'],
})
export class HomestayDetailComponent implements OnInit {
  constructor(
    private http: HomestayService,
    private image: ImageService,
    public dialog: MatDialog,
    private httpAdmin: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    let role = localStorage.getItem('role');
    if (role == 'LANDLORD' && this.router.url.includes('/Admin')) {
      this.router.navigate(['/Landlord/Dashboard'], {
        relativeTo: this.route,
      });
    } else if (role == 'ADMIN') {
      this.name = sessionStorage.getItem('name') as string;
      this.getHomestay();
    }
  }
  name!: string;
  message!: string;
  datas!: Homestay;
  url!: any;
  urls: string[] = [];
  urls4: string[] = [];
  priceTax!: number;
  showBooking = false;

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
  id: any;
  getHomestay() {
    try {
      this.http.getHomestayDetailByName(this.name).subscribe({
        next: async (data: any) => {
          if (data) {
            const value = data;
            this.urls = [];
            this.urls4 = [];
            this.id = value.id;
            console.log(value.homestayFacilities);
            this.datas = {
              id: value.id,
              address: value.address,
              availableRooms: value.availableRooms,
              businessLicense: value.businessLicense,
              homestayFacilities: value.homestayFacilities,
              homestayImages: value.homestayImages,
              homestayRules: value.homestayRules,
              homestayServices: value.homestayServices,
              name: value.name,
              numberOfRating: value.numberOfRating,
              price: value.price,
              ratings: value.rating,
              status: value.status,
              totalAverageRating: value.totalAverageRating,
              isPendingBooking: value.isPendingBooking,
            };
            console.log('value', value);
            console.log('this.datas', this.datas);
            for (this.url of value.homestayImages) {
              await this.image
                .getImage(('homestay/' + this.url.imageUrl) as string)
                .then((url) => {
                  let urls = url as string;
                  this.urls.push(urls);
                });
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
            var priceToFixed = (this.datas.price * 0.95).toFixed();
            this.priceTax = priceToFixed as unknown as number;
          }
        },
        error: (error) => {
          this.message = error;
          this.openDialogMessage;
        },
      });
    } catch (error) {
      this.message = error as string;
      this.openDialogMessage();
      console.log(error);
    }
  }
  datasBooking: any[] = [];

  public accept() {
    console.log('Accept');
    this.httpAdmin.activeHomestay(this.name).subscribe(
      (data) => {
        if (data != null) {
          this.message = ' Homestay have accept';
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
    localStorage.setItem('Homestay', 'true');
    const dialogRef = this.dialog.open(PendingHomestayComponent, {
      data: {
        id: this.id,
        name: this.name,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getHomestay();
      }, 4000);
    });
  }
}
