import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { MatDialog } from '@angular/material/dialog';
import { HomestayService } from 'src/app/services/homestay.service';

@Component({
  selector: 'app-homestay',
  templateUrl: './homestay.component.html',
  styleUrls: ['./homestay.component.scss'],
})
export class HomestayComponent implements OnInit {
  constructor(
    private image: ImageService,
    public dialog: MatDialog,
    private http: HomestayService,
  ) {}
  valuePending: any[] = [];
  valueActivating: any[] = [];
  valueReject: any[] = [];

  isDelete = 'null';
  public username = localStorage.getItem('usernameLogined') as string;
  ngOnInit(): void {
    this.username = localStorage.getItem('usernameLogined') as string;

    this.getHomestayActivating();
    this.getHomestayPending();
    this.getHomestayReject();
  }

  getHomestayPending() {
    this.valuePending = [];

    this.http.getHomestayByLandlord('PENDING').subscribe(async (data) => {
      console.log('data pending:', data['homestays']);
      for (let i of data['homestays'].reverse()) {
        var imgUrl;
        await this.image
          .getImage('homestay/' + i.homestayImages[0].imageUrl)
          .then((url) => {
            imgUrl = url;
            this.valuePending.push({
              imgURL: imgUrl,
              name: i.name,
              id: i.id,
              status: i.status,
            });
          })
          .catch((error) => {
            console.log(error);
          });

      }
    });
  }
  getHomestayActivating() {
    this.valueActivating = [];

    this.http.getHomestayByLandlord('ACTIVATING').subscribe(async (data) => {
      console.log('data active:', data['homestays']);
      for (let i of data['homestays'].reverse()) {
        var imgUrl;
        await this.image
          .getImage('homestay/' + i.homestayImages[0].imageUrl)
          .then((url) => {
            imgUrl = url;
            this.valueActivating.push({
              imgURL: imgUrl,
              name: i.name,
              id: i.id,
              status: i.status,
              isPendingBooking: i.isPendingBooking,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }
  getHomestayReject() {
    this.valueReject =[];

    this.http.getHomestayByLandlord('REJECTED_LICENSE_NOT_MATCHED').subscribe(async (data) => {
      console.log('data reject:', data['homestays']);
      for (let i of data['homestays'].reverse()) {
        var imgUrl;
        await this.image
          .getImage('homestay/' + i.homestayImages[0].imageUrl)
          .then((url) => {
            imgUrl = url;
            this.valueReject.push({
              imgURL: imgUrl,
              name: i.name,
              id: i.id,
              status: i.status,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  getHomestayName(name: string) {
    sessionStorage.setItem('name', name);
  }
  id: string = '';
  getHomestayId(id: string) {
    this.id = id;
  }

  openDialog() {
    // this.dialog.open(DeleteHomestayDialogComponent,{
    //   data : this.id
    // });
  }
}
