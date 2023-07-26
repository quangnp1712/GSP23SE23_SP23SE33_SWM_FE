import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionPendingComponent } from '../../pop-up/action-pending/action-pending.component';
import { MessageComponent } from '../../pop-up/message/message.component';
import { SuccessComponent } from '../../pop-up/success/success.component';
import { ImageService } from '../../services/image.service';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-account-landlord',
  templateUrl: './request-account-landlord.component.html',
  styleUrls: ['./request-account-landlord.component.scss'],
})
export class RequestAccountLandlordComponent implements OnInit {
  valuesPending: data[] = [];
  valuesBanned: data[] = [];
  valuesActive: data[] = [];
  valuesReject: data[] = [];
  message!: string;
  registerError: string = '';
  constructor(
    private http: AdminService,
    public dialog: MatDialog,
    private image: ImageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    let role = localStorage.getItem('role');
    if (role == 'LANDLORD' && this.router.url.includes('/Admin')) {
      this.router.navigate(['/Landlord/Dashboard'], {
        relativeTo: this.route,
      });
    } else if(role == "ADMIN") {
      this.valuesPending = [];
      this.valuesBanned = [];
      this.valuesActive = [];
      this.valuesReject = [];
      this.getStatusLandlord();
      console.log('length:', this.valuesPending.length);
      if (localStorage.getItem('isAccept') == 'true') {
        this.message = 'Account have accept';
        this.openDialogSuccess();
        localStorage.setItem('isAccept', 'false');
      }
      if (localStorage.getItem('isReject') == 'true') {
        this.message = 'Account have reject';
        this.openDialogSuccess();
        localStorage.setItem('isReject', 'false');
      }
    }
  }
  public getStatusLandlord() {
    // Pending
    this.http.getLandlordListFilterByStatus('PENDING').subscribe((data) => {
      this.valuesPending = data['userList'];
      console.log(this.valuesPending);
    });
    // Banned
    this.http.getLandlordListFilterByStatus('BANNED').subscribe((data) => {
      this.valuesBanned = data['userList'];
      console.log(this.valuesBanned);
    });
    // Active
    this.http.getLandlordListFilterByStatus('ACTIVATING').subscribe((data) => {
      this.valuesActive = data['userList'];
      console.log(this.valuesActive);
    });
    // Reject
    this.http.getLandlordListFilterByStatus('REJECT').subscribe((data) => {
      this.valuesReject = data['userList'];
      console.log(this.valuesReject);
    });
  }

  public Id = 0;
  public createBy = '';
  public rejectMessage = '';
  public username = '';

  public onItemSelector(id: number, createdBy: string) {
    this.Id = id;
    this.username = createdBy;
    localStorage.setItem('id', id + '');
    localStorage.setItem('createdBy', createdBy);
  }

  public accept() {
    console.log('Accept');
    this.http.activateLandlordAccount(this.username).subscribe(
      (data) => {
        if (data != null) {
          localStorage.setItem('isAccept', 'true');
          this.getStatusLandlord();
          this.message = 'Accept Landlord Success';
          this.openDialogSuccess();
        }
        console.log(data);
      },
      (error) => {
        if (error['status'] == 500) {
          this.message = 'please check your information again!';
          this.openDialogMessage();
        } else {
          this.message = error;
          this.openDialogMessage();
        }
      }
    );
  }

  isChecked!: boolean;

  // Pending
  pagePending: number = 1;
  countPending: number = 0;
  tableSizePending: number = 5;

  // Pending
  onTableDataChangePending(event: any) {
    this.pagePending = event;
    this.valuesPending;
  }

  // Banned
  onTableDataChangeBanned(event: any) {
    // this.page = event;
    // this.valuesBanned;
  }

  // Active
  pageActive: number = 1;
  countActive: number = 0;
  tableSizeActive: number = 5;
  // Active
  onTableDataChangeActive(event: any) {
    this.pageActive = event;
    this.valuesActive;
  }

  // Reject
  pageReject: number = 1;
  countReject: number = 0;
  tableSizeReject: number = 5;
  // Reject
  onTableDataChangeReject(event: any) {
    this.pageReject = event;
    this.valuesReject;
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

  openDialogAction() {
    const dialogRef = this.dialog.open(ActionPendingComponent, {
      data: {
        username: this.username,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getStatusLandlord();
      }, 4500);
    });
  }
}

export interface data {
  username: string;
  id: number;
  createdDate: string;
  type: string;
  status: string;
  avatarUrl: string;
  email: string;
}
