import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';
import { SuccessComponent } from '../success/success.component';

import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pending-homestay',
  templateUrl: './pending-homestay.component.html',
  styleUrls: ['./pending-homestay.component.scss'],
})
export class PendingHomestayComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { name: string },
    public dialog: MatDialog,
    private http: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  message: any;

  public reject() {
    console.log('Reject');
    if (localStorage.getItem('blocHomestay') == 'true') {
      this.http.rejectBlocHomestay(this.data.name).subscribe(
        (data) => {
          if (data != null) {
            this.message = 'Bloc Homestay have reject';
            this.openDialogSuccess();
          }
        },
        (error) => {
          if (error['status'] == 500) {
            // this.registerError = 'please check your information again!';
            this.message = error;
            this.openDialogMessage();
          } else {
            // this.registerError = error;
            this.message = error;
            this.openDialogMessage();
          }
        }
      );
    } else {
      this.http.rejectHomestay(this.data.name).subscribe(
        (data) => {
          if (data != null) {
            this.message = 'Homestay have reject';
            this.openDialogSuccess();

          }
        },
        (error) => {
          if (error['status'] == 500) {
            // this.registerError = 'please check your information again!';
            this.message = error;
            this.openDialogMessage();
          } else {
            // this.registerError = error;
            this.message = error;
            this.openDialogMessage();
          }
        }
      );
    }
  }

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
}
