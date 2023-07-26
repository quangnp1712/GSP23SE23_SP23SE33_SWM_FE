import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Homestay } from 'src/app/models/homestay.model';
import { ActionPendingComponent } from 'src/app/pop-up/action-pending/action-pending.component';
import { BookingPendingComponent } from 'src/app/pop-up/booking-pending/booking-pending.component';

import { MessageComponent } from 'src/app/pop-up/message/message.component';
import { SuccessComponent } from 'src/app/pop-up/success/success.component';
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
    private httpBooking: BookingService,
    private image: ImageService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.name = sessionStorage.getItem('name') as string;
    this.getHomestay();
    this.booking();
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

  getHomestay() {
    try {
      this.http.getHomestayDetailByName(this.name).subscribe({
        next: async (data: any) => {
          if (data) {
            console.log('data homestay:', data);
            const value = data;
            this.urls = [];
            this.urls4 = [];

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
              isPendingBooking: value.isPendingBooking as boolean,
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
  booking() {
    this.datasBooking = [];
    try {
      this.httpBooking.getBookingForLandlord(this.name, 'PENDING').subscribe({
        next: (data: any) => {
          if (data) {
            console.log('booking ', data);
            const value = data;
            for (let i of value.bookingList.reverse()) {
              this.datasBooking.push({
                id: i.booking.id,
                code: i.booking.code,
                bookingFrom: i.booking.bookingFrom,
                bookingTo: i.booking.bookingTo,
                bloc: i.booking.bloc,
                bookingHomestayServices: i.booking.bookingHomestayServices,
                totalBookingPrice: i.totalBookingPrice,
                paymentMethod: i.paymentMethod,
              });
            }
            console.log('booking', this.datasBooking);
          }
        },
      });
    } catch (error) {
      this.message = error as string;
      this.openDialogMessage();
      console.log(error);
    }
  }

  accept(id: number) {
    console.log('accpet hoemstay id:', this.datas.id);
    console.log('accpet booking id:', id);

    try {
      this.httpBooking.acceptBookingForHomestay(id, this.datas.id).subscribe({
        next: (data: any) => {
          this.message = 'Accept Booking Homestay Success';
          this.openDialogSuccess();
          this.getHomestay();
          this.booking();
          this.showBooking = true;
        },
        error: (error) => {
          this.message = error;
          this.openDialogMessage();
        },
      });
    } catch (error) {
      this.message = error as string;
      this.openDialogMessage();
      console.log(error);
    }
  }

  reject(bookingId: number, homestayId: number) {
    const dialogRef = this.dialog.open(BookingPendingComponent, {
      data: {
        bookingId: bookingId,
        homestayId: homestayId,
        type:"homestay"
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getHomestay();
        this.booking();
        this.showBooking = true;
      }, 4000);
    });
  }
  checkin(){}

  checkout(){}
}
