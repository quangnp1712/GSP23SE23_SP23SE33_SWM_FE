import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MessageComponent } from '../message/message.component';
import { SuccessComponent } from '../success/success.component';
import { AdminService } from '../../services/admin.service';
import { AccountLandlordDetailComponent } from 'src/app/admin/request-account-landlord/account-landlord-detail/account-landlord-detail.component';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-action-pending',
  templateUrl: './action-pending.component.html',
  styleUrls: ['./action-pending.component.scss'],
})
export class ActionPendingComponent {
  constructor(
    public dialogRef: MatDialogRef<AccountLandlordDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {username:string , isReject:boolean},
    public dialog: MatDialog,
    private http: AdminService
  ) {}

  message: any;
  status: any;
  orther!: string;

  public reject() {
    this.data.isReject = false;
    console.log('Reject');
    console.log(this.status);
    if (this.status == 'ORTHER') {
      this.status = 'NOT_MATCHED';
    }
    this.http.rejectLandlordAccount(this.data.username, this.status).subscribe(
      (data) => {
        if (data != null)
        {
          this.data.isReject = true;
          this.message = 'Account have reject';
          this.openDialogSuccess();
          this.dialogRef.close(this.data.isReject);
        }
      },
      (error) => {
        if (error['status'] == 500) {
          this.message = 'please check your information again!';
          this.openDialogMessage();
        } else {
          this.message = error.message;
          this.openDialogMessage();
        }
      }
    );
  }
  openDialogMessage() {
    localStorage.setItem('action-pending', 'true');
    this.dialog.open(MessageComponent, {
      data: this.message,
    });
  }
  openDialogSuccess() {
    localStorage.setItem('action-pending', 'true');
    this.dialog.open(SuccessComponent, {
      data: this.message,
    });
  }

}
