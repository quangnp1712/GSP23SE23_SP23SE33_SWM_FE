import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../../pop-up/message/message.component';
import { SuccessComponent } from '../../pop-up/success/success.component';

import { PendingHomestayComponent } from '../../pop-up/pending-homestay/pending-homestay.component';
import { HomestayService } from '../../services/homestay.service';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-homestay',
  templateUrl: './request-homestay.component.html',
  styleUrls: ['./request-homestay.component.scss'],
})
export class RequestHomestayComponent implements OnInit {
  valuesPending: data[] = [];
  valuesBanned: data[] = [];
  valuesActive: data[] = [];
  valuesReject: data[] = [];
  message!: string;
  constructor(
    public dialog: MatDialog,
    private httpHomestay: HomestayService,
    private httpAdmin: AdminService,
    private router: Router,
    private route: ActivatedRoute
    ,
  ) {}
  ngOnInit(): void {
    let role = localStorage.getItem('role');
    if(role == "LANDLORD" && this.router.url.includes('/Admin')){
      this.router.navigate(['/Landlord/Dashboard'], {
        relativeTo: this.route,});
    } else if(role == "ADMIN"){
      this.getStatusHomestay();
    }

  }

  public getStatusHomestay() {
    // Pending
    this.httpHomestay.getHomestayByStatus('PENDING').subscribe((data) => {
      this.valuesPending = data['homestays'];
      console.log(this.valuesPending);
    });
    // Banned
    this.httpHomestay.getHomestayByStatus('BANNED').subscribe((data) => {
      this.valuesBanned = data['homestays'];
      console.log(this.valuesBanned);
    });
    // Active
    this.httpHomestay.getHomestayByStatus('ACTIVATING').subscribe((data) => {
      this.valuesActive = data['homestays'];
      console.log(this.valuesActive);
      console.log(data);
    });
    // Reject
    this.httpHomestay
      .getHomestayByStatus('REJECTED_LICENSE_NOT_MATCHED')
      .subscribe((data) => {
        this.valuesReject = data['homestays'];
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
    this.httpAdmin.activeHomestay(this.name).subscribe(
      (data) => {
        if (data != null) {
          this.message = ' Homestay have accept';
          this.openDialogSuccess();
          this.getStatusHomestay();
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
    this.httpAdmin.rejectHomestay(this.name).subscribe(
      (data) => {
        if (data != null) {
          this.message = 'Account have reject';
          this.openDialogSuccess();
          location.reload();
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
    const dialogRef = this.dialog.open(PendingHomestayComponent, {
      data: {
        name: this.name,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(()=>{
      setTimeout(() =>{
        console.log('after close');
        this.getStatusHomestay();
      } , 4000)
    })
  }
}
export interface data {
  name: string;
  id: number;
  createdDate: string;
  type: string;
  status: string;
}
