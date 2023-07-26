import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BookingService } from 'src/app/services/booking.service';
import { MessageComponent } from '../message/message.component';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { code: string; type: string },
    private http: BookingService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<BookingComponent>
  ) {}
  ngOnInit(): void {
    this.getBooking();
  }
  booking: any;
  message: any;
  getBooking() {
    try {
      if (this.data.code) {
        this.http.getLandlordBooking(this.data.code).subscribe({
          next: (data) => {
            console.log(data);
            this.booking = data;
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  checkin(type: string, bookingId: number, homestayId: number) {
    if (type == 'HOMESTAY') {
      try {
        if(bookingId && homestayId){
          this.http.checkInForHomestay(bookingId, homestayId).subscribe({
            next: (data) =>{
              this.message = "Check-in Homestay Success";
              this.openDialogSuccess();
              this.dialogRef.close();

            }
          })
        }

      } catch (error) {
        console.log(error);
      }
    } else if (type == 'BLOC') {
      try {
        if(bookingId && homestayId){
          this.http.checkInForBloc(bookingId).subscribe({
            next: (data) =>{
              this.message = "Check-in Block Homestay Success";
              this.openDialogSuccess();
              this.dialogRef.close();

            }
          })
        }

      } catch (error) {
        console.log(error);
      }
    }
  }
  checkout(type: string, bookingId: number, homestayId: number) {
    if (type == 'HOMESTAY') {
      try {
        if(bookingId && homestayId){
          this.http.checkOutForHomestay(bookingId, homestayId).subscribe({
            next: (data) =>{
              this.message = "Check-out Homestay Success";
              this.openDialogSuccess();
              this.dialogRef.close();

            }
          })
        }

      } catch (error) {
        console.log(error);
      }
    } else if (type == 'BLOC') {
      try {
        if(bookingId && homestayId){
          this.http.checkOutForBloc(bookingId).subscribe({
            next: (data) =>{
              this.message = "Check-out Block Homestay Success";
              this.openDialogSuccess();
              this.dialogRef.close();

            }
          })
        }

      } catch (error) {
        console.log(error);
      }
    }
  }
  getHomestayName(name: string) {
    sessionStorage.setItem('name', name);
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
