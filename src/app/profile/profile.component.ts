import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../pop-up/message/message.component';
import { SuccessComponent } from '../pop-up/success/success.component';
import { UserService } from '../services/user.service';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  id: any;
  username: any;
  email!: string;
  status: any;
  avatarUrl: any;
  phone: any;
  dob: any;
  address!: string;
  minDate!: Date;
  maxDate!: Date;
  password: any;
  isUpdate = false;

  constructor(public dialog: MatDialog, private http: UserService, private httpPayment: PaymentService) {
    const currentYear = new Date().getFullYear();
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    this.minDate = new Date(currentYear - 100, 0, 0);
    this.maxDate = new Date(currentDate);


  }
  ngOnInit(): void {
    try {
      const username = localStorage.getItem('usernameLogined') as string;
      this.http.getUserInfo(username).subscribe(
        (data) => {
          console.log(data);
          this.username = data.username;
          this.email = data.email;
          this.phone = data.phone;
          this.dob = data.dob;
          this.address = data.address;
          this.balance = data.landlordProperty.balanceWallet.totalBalance;
        },
        (error) => {
          this.message = error;
          this.openDialogMessage();
        }
      );
    } catch (error) {
      this.message = error;
      this.openDialogMessage();
    }
    this.getCommissionList();

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
  hidePassword = true;
  hideConfirmPass = true;
  message: any;
  value: any;

  filter = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  filterPhone = /^[0]\d{9,12}$/;
  validMail: boolean = true;
  validPhone: boolean = true;
  public valid() {
    this.validMail = this.filter.test(this.email + '');
    this.validPhone = this.filterPhone.test(this.phone + '');
    if (this.username == '') {
      this.username = this.value.username;
    } else if (this.address == '') {
      this.address = this.value.address;
    } else if (this.dob == '') {
      this.dob = this.value.dob;
    } else if (this.email == '') {
      this.email = this.value.quantity;
    } else if (this.phone == '') {
      this.phone = this.value.phone;
    } else if (this.validMail == false) {
      this.message = 'Email không hợp lệ';
      this.isValid = false;
      this.openDialogMessage();
    } else if (this.validPhone == false) {
      this.message = 'Phone không hợp lệ';
      this.isValid = false;
      this.openDialogMessage();
    } else this.isValid = true;
  }
  isValid!: boolean;

  convert(event: any): void {
    console.log(event);
    var date = new Date(event),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    this.dob = [date.getFullYear(), mnth, day].join('-');
    console.log('convert', this.dob);
  }

  checkPassword() {
    let password = localStorage.getItem('password') as string;
    if (this.password == password) {
      this.isUpdate = true;
    } else {
      this.isUpdate = false;
      this.message = 'Sai mật khẩu';
      this.openDialogMessage();
    }
  }
  balance: any;
  showDiv = {
    // profile: true,
    addBalance: false,
    changePass: false,
    cashOut: false,
    editProfile: true,
  };
  toggle = {
    addBalance: false,
    changePass: false,
    cashOut: false,
    editProfile: false,
  };

  public amount !:number;
  public addMoney() {
    if(this.amount < 1000){
      this.message = "Please input amount more 1.000 đ";
      this.openDialogMessage();
      return;
    }else{
      this.httpPayment.passengerPayment(this.amount).subscribe(
      (data) => {
        console.log(data);
        window.open(data['payUrl']);
      },
      (error) => {
        alert(error);
      }
    );
    }

  }
  comission:any[]=[];
  getCommissionList(){
    try {
      this.http.getCommissionList().subscribe(data =>{
        if(data){
          console.log(data);
          this.comission = data.reverse() ;
        }
      },
      error =>{
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  }
  pageCommission: number = 1;
  countCommission: number = 0;
  tableSizeCommission: number =10;
  onTableDataChangeCommission(event: any) {
    this.pageCommission = event;
    this.comission;
  }
}
