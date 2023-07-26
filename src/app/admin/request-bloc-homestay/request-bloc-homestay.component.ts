import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../../pop-up/message/message.component';
import { SuccessComponent } from '../../pop-up/success/success.component';

import { PendingHomestayComponent } from '../../pop-up/pending-homestay/pending-homestay.component';
import { HomestayService } from '../../services/homestay.service';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-request-bloc-homestay',
  templateUrl: './request-bloc-homestay.component.html',
  styleUrls: ['./request-bloc-homestay.component.scss'],
})
export class RequestBlocHomestayComponent {
  valuesPending: data[] = [];
  valuesBanned: data[] = [];
  valuesActive: data[] = [];
  valuesReject: data[] = [];
  message!: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private httpHomestay: HomestayService,
    private httpAdmin: AdminService
  ) {}
  ngOnInit(): void {
    let role = localStorage.getItem('role');
    if(role == "LANDLORD" && this.router.url.includes('/Admin')){
      this.router.navigate(['/Landlord/Dashboard'], {
        relativeTo: this.route,});
    } else if(role == "ADMIN"){
      this.getStatusBlocHomestay();
    }

  }

  public getStatusBlocHomestay() {
    // Pending
    this.httpHomestay.findBlocList('PENDING').subscribe((data) => {
      this.valuesPending = data['blocs'];
      console.log(this.valuesPending);
    });
    // Banned
    this.httpHomestay.findBlocList('BANNED').subscribe((data) => {
      this.valuesBanned = data['blocs'];
      console.log(this.valuesBanned);
    });
    // Active
    this.httpHomestay.findBlocList('ACTIVATING').subscribe((data) => {
      this.valuesActive = data['blocs'];
      console.log(data);
    });
    // Reject
    this.httpHomestay
      .findBlocList('REJECTED_LICENSE_NOT_MATCHED')
      .subscribe((data) => {
        this.valuesReject = data['blocs'];
        console.log(this.valuesReject);
      });
  }
  public Id = 0;
  public createBy = '';
  public rejectMessage = '';
  public name = '';

  public onItemSelector(id: number, name: string) {
    this.Id = id;
    this.name = name;
    localStorage.setItem('homestayId', id + '');
    sessionStorage.setItem('name', name);
  }
  public accept() {
    console.log('Accept');
    this.httpAdmin.activeBlocHomestay(this.name).subscribe(
      (data) => {
        if (data != null) {
          this.message = 'Bloc Homestay have accept';
          this.openDialogSuccess();
          this.getStatusBlocHomestay();
        }
        console.log(data);
      },
      (error) => {
        this.message = error;
        this.openDialogMessage();
      }
    );
  }

  public reject() {
    console.log('Reject');
    this.httpAdmin.rejectBlocHomestay(this.name).subscribe(
      (data) => {
        if (data != null) {
          this.message = 'Bloc Homestay have reject';
          this.openDialogSuccess();
          this.getStatusBlocHomestay();
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
  banned() {}

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
    localStorage.setItem('blocHomestay', 'true');
    const dialogRef = this.dialog.open(PendingHomestayComponent, {
      data: {
        id: this.Id,
        name: this.name,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getStatusBlocHomestay();
      }, 4000);
    });
  }
}
export interface data {
  name: string;
  id: number;
  createdDate: string;
  type: string;
  status: string;
}
