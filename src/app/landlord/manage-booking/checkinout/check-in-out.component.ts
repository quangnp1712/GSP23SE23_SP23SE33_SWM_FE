import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/pop-up/message/message.component';
import { SuccessComponent } from 'src/app/pop-up/success/success.component';
import { BookingService } from 'src/app/services/booking.service';
import { HomestayService } from 'src/app/services/homestay.service';
import { ImageService } from 'src/app/services/image.service';
import { Observable } from 'rxjs';
import { BookingComponent } from 'src/app/pop-up/booking/booking.component';

@Component({
  selector: 'app-check-in-out',
  templateUrl: './check-in-out.component.html',
  styleUrls: ['./check-in-out.component.scss'],
})
export class CheckInOutComponent implements OnInit {
  constructor(
    private httpHomestay: HomestayService,
    private httpBooking: BookingService,
    public dialog: MatDialog,
    private image: ImageService
  ) {}
  ngOnInit(): void {
    this.getCheckOut();
    this.getCheckIn();
  }

  valuesCheckIn: any[] = [];
  valuesCheckOut: any[] = [];
  message!: string;
  id: any;
  username: any;

  // valuesCheckIn
  pageCheckIn: number = 1;
  countCheckIn: number = 0;
  tableSizeCheckIn: number = 5;

  // valuesCheckOut
  pageCheckOut: number = 1;
  countCheckOut: number = 0;
  tableSizeCheckOut: number = 5;

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
  getCheckIn() {
    this.valuesCheckIn = [];
    try {
      this.httpHomestay
        .getHomestayByLandlord('ACTIVATING')
        .subscribe(async (data) => {
          this.valuesCheckIn = [];
          for (let i of data['homestays']) {
            this.httpBooking
              .getBookingForLandlord(i.name, 'ACCEPTED')
              .subscribe({
                next: (data) => {
                  // console.log('data :' , data);
                  if (data['bookingList']) {
                    for (let b of data['bookingList']){
                       this.valuesCheckIn.push(b.booking);
                    }

                  }
                },
              });
          }
        });
      this.httpHomestay.getBlocByLandlord('ACTIVATING').subscribe({
        next: async (data) => {
          console.log('data:', data['blocs']);
          for (let i of data['blocs']) {
            this.httpBooking
              .getBookingBlocForLandlord(i.name, 'ACCEPTED')
              .subscribe({
                next: (data) => {
                  console.log('data :', data);
                  if (data) {
                    for (let b of data){
                      this.valuesCheckIn.push(b);
                    }

                  }
                },
              });
          }
        },
      });
      // console.log('valuesCheckin:', this.valuesCheckIn);
    } catch (error) {
      this.message = error as string;
      this.openDialogMessage();
      console.log(error);
    }
  }

  getCheckOut() {
    this.valuesCheckOut = [];
    try {
      this.httpHomestay
        .getHomestayByLandlord('ACTIVATING')
        .subscribe(async (data) => {
          this.valuesCheckOut = [];
          for (let i of data['homestays']) {
            this.httpBooking
              .getBookingForLandlord(i.name, 'CHECKEDIN')
              .subscribe({
                next: (data) => {
                  // console.log('data :' , data);
                  if (data['bookingList']) {
                    for (let b of data['bookingList']){
                       this.valuesCheckOut.push(b.booking);
                    }

                  }
                },
              });
          }
        });
      this.httpHomestay.getBlocByLandlord('ACTIVATING').subscribe({
        next: async (data) => {
          // console.log('data:', data['blocs']);
          for (let i of data['blocs']) {
            this.httpBooking
              .getBookingBlocForLandlord(i.name, 'CHECKEDIN')
              .subscribe({
                next: (data) => {
                  console.log('data :', data);
                  if (data) {
                    for (let b of data){
                      this.valuesCheckOut.push(b);
                    }

                  }
                },
              });
          }
        },
      });
      // console.log('valuesCheckOut:', this.valuesCheckOut);
    } catch (error) {
      this.message = error as string;
      this.openDialogMessage();
      console.log(error);
    }

  }

  public onItemSelector(id: number, createdBy: string) {
    this.id = id;
    this.username = createdBy;
    localStorage.setItem('id', id + '');
    sessionStorage.setItem('name', createdBy);
  }
  accept() {}
  openDialogAction() {}

  onTableDataChangeCheckIn(event: any) {
    this.pageCheckIn = event;
    this.valuesCheckIn;
  }
  onTableDataChangeCheckOut(event: any) {
    this.pageCheckOut = event;
    this.valuesCheckOut;
  }

  searchCheckInInput: any;
  searchCheckIn() {
    try {
      if (this.searchCheckInInput) {
        this.httpBooking.getLandlordBooking(this.searchCheckInInput).subscribe({
          next: (data) => {
            this.valuesCheckIn = [];
            this.valuesCheckIn.push(data);
          },
          error: (error) => {
            this.message = 'Booking Code Not Found';
            this.openDialogMessage();
          },
        });
      } else {
        this.getCheckIn();
      }
    } catch (error) {
      console.log(error);
    }
  }

  searchCheckOutInput: any;
  searchCheckOut() {
    try {
      if (this.searchCheckOutInput) {
        this.httpBooking
          .getLandlordBooking(this.searchCheckOutInput)
          .subscribe({
            next: (data) => {
              this.valuesCheckOut = [];
              this.valuesCheckOut.push(data);
            },
            error: (error) => {
              this.message = 'Booking Code Not Found';
              this.openDialogMessage();
            },
          });
      } else {
        this.getCheckOut();
      }
    } catch (error) {
      console.log(error);
    }
  }
  openBooking(code:any, type:any){
    const dialogRef = this.dialog.open(BookingComponent, {
      data:{
        code:code,
        type:type
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getCheckIn();
        this.getCheckOut();
      }, 3000);
    });
  }
}
