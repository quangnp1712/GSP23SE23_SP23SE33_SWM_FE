import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImageService } from 'src/app/services/image.service';
import { Router, ActivatedRoute } from '@angular/router';

import { MessageComponent } from '../../../pop-up/message/message.component';
import { SuccessComponent } from '../../../pop-up/success/success.component';
import { AdminService } from '../../../services/admin.service';
import { UserService } from '../../../services/user.service';
import { ActionPendingComponent } from '../../../pop-up/action-pending/action-pending.component';

@Component({
  selector: 'app-account-landlord-detail',
  templateUrl: './account-landlord-detail.component.html',
  styleUrls: ['./account-landlord-detail.component.scss'],
})
export class AccountLandlordDetailComponent implements OnInit {
  registerError: string = '';
  message!: string;
  constructor(
    private httpUser: UserService,
    private httpAdmin: AdminService ,
    public dialog: MatDialog,
    private image: ImageService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogRefSuccess : MatDialogRef<SuccessComponent>
  ) {}
  public username = '';
  public email = '';
  public phone = '';
  public gender = '';
  public citizenIdentificationString = '';
  public dob = '';
  public address = '';
  public avatarUrl = '';
  public citizenIdentificationUrlFont = '';
  public citizenIdentificationUrlBack = '';
  status !: string;
  ngOnInit(): void {
   this.getAccountDetail();
   let role = localStorage.getItem('role');
  if(role == "LANDLORD" && this.router.url.includes('/Admin')){
    this.router.navigate(['/Landlord/Dashboard'], {
      relativeTo: this.route,});
  }
  }
  getAccountDetail(){
    this.username = '';
    this.email = '';
    this.phone = '';
    this.gender = '';
    this.citizenIdentificationString = '';
    this.dob = '';
    this.address = '';
    this.avatarUrl = '';
    this.citizenIdentificationUrlFont = '';
    this.citizenIdentificationUrlBack = '';
    this.status = '';
    try {
      const name = localStorage.getItem('createdBy') as string;
      this.httpUser.getUserInfo(name).subscribe(
        async (data) => {
          this.username = data['username'];
          this.dob = data['dob'];
          this.email = data['email'];
          this.citizenIdentificationString =
            data['idCardNumber'];
          this.gender = data['gender'];
          this.phone = data['phone'];
          this.address = data['address'];
          this.status = data.landlordProperty.status;
          console.log('avatar', data['avataUrl']);
          if (data['avataUrl']) {
            this.avatarUrl = await this.image.getImage(
              'landlord/avatar/' + data['avataUrl']
            );
          } else {
            this.avatarUrl = await this.image.getImage(
              'landlord/avatar/default.png'
            );
          }
          var landlordProperty = data['landlordProperty'];
          var fontImage = landlordProperty.idCardFrontImageUrl;
          var backImage = landlordProperty.idCardBackImageUrl;
          this.citizenIdentificationUrlFont = await this.image.getImage(
            'landlord/citizenIdentification/' +
              fontImage
          );
          this.citizenIdentificationUrlBack = await this.image.getImage(
            'landlord/citizenIdentification/' +
              backImage
          );
          console.log("data" , data);

        },
        (error) => {
          this.message = error.message;
          console.log(this.message);
          this.openDialogMessage();
        }
      );
    } catch (error) {
      console.log(error);
      this.openDialogMessage();
    }
  }
  openDialogMessage() {
    localStorage.setItem('account-landlord-detail', 'true');
    this.dialog.open(MessageComponent, {
      data: this.message,
    });
  }
  openDialogSuccess() {
    this.dialog.open(SuccessComponent, {
      data: this.message,
    });
  }
  public isAccept = true;
  public isReject = false;
  public rejectMessage = '';
  public accept() {

    this.httpAdmin.activateLandlordAccount(this.username).subscribe(
      (data) => {
        if (data != null) {
          this.message = 'Account have accept';
          this.openDialogSuccess();
          this.getAccountDetail();
        }

        console.log(data);
      },
      (error) => {
        if (error['status'] == 500) {
          this.registerError = 'please check your information again!';
          this.message = this.registerError;
          this.message = this.registerError;
          this.openDialogMessage();
        } else {
          this.registerError = error;
          this.message = error;
          this.message = this.registerError;
          this.openDialogMessage();
        }
      }
    );
  }

  openDialogAction() {
    const dialogRef = this.dialog.open(ActionPendingComponent, {
      data: {
        username: this.username,
        isReject:this.isReject
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(()=>{
      setTimeout(() =>{
        this.getAccountDetail();
      } , 4000)
    })
  }
}
