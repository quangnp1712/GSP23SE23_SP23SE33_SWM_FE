import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlocHomestay } from 'src/app/models/bloc-homestay.model';
import { BookingPendingComponent } from 'src/app/pop-up/booking-pending/booking-pending.component';
import { MessageComponent } from 'src/app/pop-up/message/message.component';
import { SuccessComponent } from 'src/app/pop-up/success/success.component';
import { BookingService } from 'src/app/services/booking.service';
import { HomestayService } from 'src/app/services/homestay.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-bloc-homestay-detail',
  templateUrl: './bloc-homestay-detail.component.html',
  styleUrls: ['./bloc-homestay-detail.component.scss'],
})
export class BlocHomestayDetailComponent {
  constructor(
    private httpHomestay: HomestayService,
    private image: ImageService,
    public dialog: MatDialog,
    private httpBooking: BookingService
  ) {}
  ngOnInit(): void {
    this.name = sessionStorage.getItem('name') as string;
    this.getHomestay();
  }
  name!: string;
  message!: string;
  datas!: BlocHomestay;
  url!: any;
  urls: string[] = [];
  urls4: string[] = [];
  priceTax!: number;
  showBooking = false;
  homestay: { name: string; price: number }[] = [];
  bookingHomestay: any[] = [];
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
      this.httpHomestay.getBlocHomestayDetailByName(this.name).subscribe({
        next: async (data: any) => {
          if (data) {
            const value = data;
            this.urls = [];
            this.urls4 = [];
            console.log('data', data);
            this.datas = {
              id: value.id,
              name: value.name,
              address: value.address,
              businessLicense: value.businessLicense,
              status: value.status,
              totalAverageRating: value.totalAverageRating,
              homestayServices: value.homestayServices,
              homestays: value.homestays,
              homestayRules: value.homestayRules,
              ratings: value.ratings,
              isPendingBooking: value.isPendingBooking,
            };
            console.log('datas', this.datas);
            this.bookingHomestay = [];
            for (let homestay of this.datas.homestays) {
              this.httpBooking
                .getBookingForLandlord(homestay.name, 'PENDING')
                .subscribe({
                  next: async (data: any) => {
                    const valueHomestay = data;
                    console.log('value homestay', valueHomestay);
                    for (let i of valueHomestay.bookingList) {
                      this.bookingHomestay.push({
                        name: homestay.name,
                        code: i.booking.code,
                        totalBookingPrice: i.totalBookingPrice,
                        paymentMethod: i.paymentMethod,
                      });
                    }
                    console.log('booking homestay', this.bookingHomestay);
                  },
                });
            }
            this.booking();
            for (let homestay of this.datas.homestays) {
              for (let url of homestay.homestayImages) {
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
            for (let i = 0; i < this.datas.homestays.length; i++) {
              var priceToFixed = (
                this.datas.homestays[i].price * 0.95
              ).toFixed();
              this.datas.homestays[i].id = priceToFixed as unknown as number;
            }
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
  // scrollBooking(){
  //   const element = document.getElementById("booking") as any;
  //   element.scrollIntoView({ behavior: 'smooth'});
  // }

  datasBooking: any[] = [];
  booking() {
    this.datasBooking = [];
    try {
      this.httpBooking
        .getBookingBlocForLandlord(this.name, 'PENDING')
        .subscribe({
          next: (data: any) => {
            if (data) {
              console.log('booking ', data);
              const value = data;
              for (let i of value.reverse()) {
                let blocBookingHomestay: any[] = [];
                console.log('this.bookingHomestay ', this.bookingHomestay);
                for (let h of this.bookingHomestay) {
                  if (h.code == i.code) {
                    blocBookingHomestay.push(h);
                  }
                }
                console.log('blocBookingHomestay', blocBookingHomestay);
                let totalPrice = 0;
                let payment = '';
                for (let h of blocBookingHomestay) {
                  totalPrice += h.totalBookingPrice;
                  payment = h.paymentMethod;
                }
                this.datasBooking.push({
                  id: i.id,
                  code: i.code,
                  bookingFrom: i.bookingFrom,
                  bookingTo: i.bookingTo,
                  bookingHomestayServices: i.bookingHomestayServices,
                  bookingHomestay: blocBookingHomestay,
                  totalBookingPrice: totalPrice,
                  paymentMethod: payment,
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
      this.httpBooking.acceptBookingForBloc(id, this.datas.id).subscribe({
        next: (data: any) => {
          this.message = 'Accept Booking Block_Homestay Success';
          this.openDialogSuccess();
          this.getHomestay();

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
        type: 'bloc',
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getHomestay();

        this.showBooking = true;
      }, 4000);
    });
  }
  getHomestayName(name: string) {
    sessionStorage.setItem('name', name);
  }
}
