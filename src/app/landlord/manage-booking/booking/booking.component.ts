import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/pop-up/message/message.component';
import { SuccessComponent } from 'src/app/pop-up/success/success.component';
import { BookingService } from 'src/app/services/booking.service';
import { HomestayService } from 'src/app/services/homestay.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  constructor(
    private httpHomestay: HomestayService,
    private httpBooking: BookingService,
    public dialog: MatDialog,
    private image: ImageService
  ) {}
  ngOnInit(): void {
    this.getBookingBloc();
    this.getBookingHomestay();
  }

  valuesHomestay: any[] = [];
  valuesBloc: any[] = [];
  message!: string;
  id: any;
  username: any;

  // valuesHomestay
  pageHomestay: number = 1;
  countHomestay: number = 0;
  tableSizeHomestay: number = 5;

  // valuesBloc
  pageBloc: number = 1;
  countBloc: number = 0;
  tableSizeBloc: number = 5;

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
  getBookingHomestay() {
    this.valuesHomestay = [];
    try {
      this.httpHomestay
        .getHomestayByLandlord('ACTIVATING')
        .subscribe(async (data) => {
          console.log('data:', data['homestays']);
          for (let i of data['homestays']) {
            var imgUrl;
            if (i.isPendingBooking) {
              await this.image
                .getImage('homestay/' + i.homestayImages[0].imageUrl)
                .then((url) => {
                  imgUrl = url;
                  this.valuesHomestay.push({
                    imgURL: imgUrl,
                    name: i.name,
                    id: i.id,
                    status: i.status,
                    isPendingBooking: i.isPendingBooking,
                  });
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }
        });
    } catch (error) {
      this.message = error as string;
      this.openDialogMessage();
      console.log(error);
    }
  }

  getBookingBloc() {
    this.valuesBloc = [];
    this.httpHomestay.getBlocByLandlord('ACTIVATING').subscribe({
      next: async (data) => {
        console.log('data:', data['blocs']);
        for (let i of data['blocs']) {
          var imgUrl;
          if (i.isPendingBooking) {
            await this.image
              .getImage('homestay/' + i.homestays[0].homestayImages[0].imageUrl)
              .then((url) => {
                imgUrl = url;
                this.valuesBloc.push({
                  imgURL: imgUrl,
                  name: i.name,
                  id: i.id,
                  status: i.status,
                  isPendingBooking: i.isPendingBooking,
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
        console.log('valuesBloc:', this.valuesBloc);
      },
    });
  }

  public onItemSelector(id: number, createdBy: string) {
    this.id = id;
    this.username = createdBy;
    localStorage.setItem('id', id + '');
    sessionStorage.setItem('name', createdBy);
  }
  accept() {}
  openDialogAction() {}

  onTableDataChangeHomestay(event: any) {
    this.pageHomestay = event;
    this.valuesHomestay;
  }
  onTableDataChangeBloc(event: any) {
    this.pageBloc = event;
    this.valuesBloc;
  }
}
