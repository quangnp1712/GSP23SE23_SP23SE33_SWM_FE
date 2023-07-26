import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BookingService } from 'src/app/services/booking.service';
import { MessageComponent } from '../message/message.component';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-booking-pending',
  templateUrl: './booking-pending.component.html',
  styleUrls: ['./booking-pending.component.scss'],
})
export class BookingPendingComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { bookingId: number; homestayId: number; type: string },
    public dialog: MatDialog,
    private http: BookingService
  ) {}
  reason!: string;
  message: any;
  openDialogMessage() {
    localStorage.setItem('action-pending', 'true');
    this.dialog.open(MessageComponent, {
      data: this.message,
    });
  }
  openDialogSuccess() {
    this.dialog.open(SuccessComponent, {
      data: this.message,
    });
  }

  reject() {
    if (this.data.type == 'homestay') {
      try {
        this.http
          .rejectBookingForHomestay(
            this.data.bookingId,
            this.data.homestayId,
            this.reason
          )
          .subscribe({
            next: (data: any) => {
              this.message = 'Reject Booking Homestay Success';
              this.openDialogSuccess();
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
    } else if (this.data.type == 'bloc') {
      try {
        this.http
          .rejectBookingForBloc(
            this.data.bookingId,
            this.data.homestayId,
            this.reason
          )
          .subscribe({
            next: (data: any) => {
              this.message = 'Reject Booking Block_Homestay Success';
              this.openDialogSuccess();
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
  }
}
